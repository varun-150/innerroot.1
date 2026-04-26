const otpService = require('../services/otpService');

/**
 * POST /otp/send — Send an OTP to a phone number.
 */
async function sendOTP(req, res) {
  try {
    const { phone } = req.validatedBody;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    const result = await otpService.sendOTP(phone, ipAddress, userAgent);
    res.json({ success: true, message: 'OTP sent successfully', retryAfter: result.retryAfter });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({
      success: false,
      error: err.message,
      ...(err.retryAfter && { retryAfter: err.retryAfter })
    });
  }
}

/**
 * POST /otp/verify — Verify an OTP code and return JWT tokens.
 */
async function verifyOTP(req, res) {
  try {
    const { phone, code } = req.validatedBody;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    const result = await otpService.verifyOTP(phone, code, ipAddress, userAgent);
    res.json({ success: true, ...result });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({
      success: false,
      error: err.message,
      ...(err.attemptsRemaining !== undefined && { attemptsRemaining: err.attemptsRemaining })
    });
  }
}

/**
 * POST /auth/refresh — Refresh an access token.
 */
async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.validatedBody;
    const ipAddress = req.ip || req.connection.remoteAddress;

    const result = await otpService.refreshToken(refreshToken, ipAddress);
    res.json({ success: true, ...result });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ success: false, error: err.message });
  }
}

/**
 * POST /auth/logout — Invalidate all sessions for the authenticated user.
 */
async function logout(req, res) {
  try {
    const result = await otpService.logout(req.user.sub);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { sendOTP, verifyOTP, refreshToken, logout };
