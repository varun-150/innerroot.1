const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OtpLog, User, RateLimit, Session, ActivityLog } = require('../models');
const smsService = require('./smsService');

class OTPService {
  /**
   * Generate a cryptographically secure 6-digit OTP.
   */
  generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
  }

  /**
   * Check if an action is within its rate limit window.
   * @returns {{ allowed: boolean, retryAfter?: number }}
   */
  async checkRateLimit(identifier, action, maxCount, windowSeconds) {
    const windowStart = new Date(Date.now() - windowSeconds * 1000);

    const [record, created] = await RateLimit.findOrCreate({
      where: { identifier, action },
      defaults: { count: 1, windowStart: new Date(), windowSeconds }
    });

    if (created) return { allowed: true };

    // Window expired — reset counter
    if (record.windowStart < windowStart) {
      await record.update({ count: 1, windowStart: new Date() });
      return { allowed: true };
    }

    // Window active — check count
    if (record.count >= maxCount) {
      const retryAfter = Math.ceil(
        (record.windowStart.getTime() + windowSeconds * 1000 - Date.now()) / 1000
      );
      return { allowed: false, retryAfter };
    }

    await record.increment('count');
    return { allowed: true };
  }

  /**
   * Send an OTP to the given phone number.
   */
  async sendOTP(phone, ipAddress, userAgent) {
    // Rate limit: 3 sends per 10 minutes per phone
    const limit = await this.checkRateLimit(phone, 'OTP_SEND', 3, 600);
    if (!limit.allowed) {
      const err = new Error(`Too many OTP requests. Try again in ${limit.retryAfter} seconds.`);
      err.status = 429;
      err.retryAfter = limit.retryAfter;
      throw err;
    }

    // Invalidate any previous unused OTPs for this phone
    await OtpLog.update(
      { isUsed: true },
      { where: { phone, isUsed: false } }
    );

    // Generate and hash the OTP
    const otp = this.generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);

    // Store the OTP log
    await OtpLog.create({
      phone,
      otpHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      ipAddress,
      userAgent
    });

    // Send SMS
    const message = `Your Inner Root login code is: ${otp}. Valid for 5 minutes. Do not share this code.`;
    await smsService.send(phone, message);

    // Log the activity
    await ActivityLog.create({
      action: 'OTP_SENT',
      metadata: { phone: phone.slice(-4) }, // only last 4 digits
      ipAddress
    });

    return { success: true, retryAfter: 60 };
  }

  /**
   * Verify an OTP code and return JWT tokens on success.
   */
  async verifyOTP(phone, code, ipAddress, userAgent) {
    // Rate limit: 5 verify attempts per 15 minutes per IP
    const limit = await this.checkRateLimit(ipAddress, 'OTP_VERIFY', 5, 900);
    if (!limit.allowed) {
      const err = new Error('Too many verification attempts. Try again later.');
      err.status = 429;
      err.retryAfter = limit.retryAfter;
      throw err;
    }

    // Find the latest unused OTP for this phone
    const otpRecord = await OtpLog.findOne({
      where: { phone, isUsed: false },
      order: [['created_at', 'DESC']]
    });

    if (!otpRecord) {
      const err = new Error('No OTP found. Please request a new one.');
      err.status = 401;
      throw err;
    }

    if (otpRecord.expiresAt < new Date()) {
      await otpRecord.update({ isUsed: true });
      const err = new Error('OTP has expired. Please request a new one.');
      err.status = 401;
      throw err;
    }

    if (otpRecord.attempts >= otpRecord.maxAttempts) {
      await otpRecord.update({ isUsed: true });
      const err = new Error('Maximum verification attempts exceeded. Request a new OTP.');
      err.status = 401;
      throw err;
    }

    // Verify the OTP hash
    const isValid = await bcrypt.compare(code, otpRecord.otpHash);
    if (!isValid) {
      await otpRecord.increment('attempts');
      const remaining = otpRecord.maxAttempts - otpRecord.attempts - 1;
      const err = new Error('Invalid OTP code.');
      err.status = 401;
      err.attemptsRemaining = remaining;
      throw err;
    }

    // Mark OTP as used
    await otpRecord.update({ isUsed: true });

    // Find or create the user
    const [user, isNewUser] = await User.findOrCreate({
      where: { phone },
      defaults: { phone, isVerified: true }
    });

    if (!isNewUser) {
      await user.update({ lastLoginAt: new Date(), isVerified: true });
    }

    // Generate access token (short-lived)
    const token = jwt.sign(
      { sub: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '1h' }
    );

    // Generate refresh token (long-lived, stored in DB)
    const refreshToken = crypto.randomBytes(64).toString('hex');
    const refreshDays = parseInt(process.env.REFRESH_TOKEN_EXPIRY_DAYS || '30', 10);

    await Session.create({
      userId: user.id,
      refreshToken,
      deviceInfo: userAgent,
      ipAddress,
      expiresAt: new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000)
    });

    // Log the activity
    await ActivityLog.create({
      userId: user.id,
      action: isNewUser ? 'SIGNUP' : 'LOGIN',
      metadata: { method: 'OTP' },
      ipAddress
    });

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        phone: user.phone,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
        isNewUser
      }
    };
  }

  /**
   * Refresh an access token using a valid refresh token.
   */
  async refreshToken(refreshTokenValue, ipAddress) {
    const session = await Session.findOne({
      where: { refreshToken: refreshTokenValue, isActive: true }
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) await session.update({ isActive: false });
      const err = new Error('Invalid or expired refresh token.');
      err.status = 401;
      throw err;
    }

    const user = await User.findByPk(session.userId);
    if (!user || !user.isActive) {
      const err = new Error('Account not found or deactivated.');
      err.status = 401;
      throw err;
    }

    // Rotate the refresh token (invalidate old, create new)
    await session.update({ isActive: false });

    const newRefreshToken = crypto.randomBytes(64).toString('hex');
    const refreshDays = parseInt(process.env.REFRESH_TOKEN_EXPIRY_DAYS || '30', 10);

    await Session.create({
      userId: user.id,
      refreshToken: newRefreshToken,
      deviceInfo: session.deviceInfo,
      ipAddress,
      expiresAt: new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000)
    });

    const token = jwt.sign(
      { sub: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '1h' }
    );

    return { token, refreshToken: newRefreshToken };
  }

  /**
   * Logout — invalidate the session.
   */
  async logout(userId) {
    await Session.update(
      { isActive: false },
      { where: { userId, isActive: true } }
    );
    return { success: true };
  }
}

module.exports = new OTPService();
