const express = require('express');
const rateLimit = require('express-rate-limit');
const { validate } = require('../middleware/validator');
const { authenticate } = require('../middleware/auth');
const controller = require('../controllers/otpController');

const router = express.Router();

// Global rate limiter for all OTP routes: 100 requests per 15 min per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests from this IP' }
});

router.use(globalLimiter);

// OTP endpoints
router.post('/otp/send', validate('sendOTP'), controller.sendOTP);
router.post('/otp/verify', validate('verifyOTP'), controller.verifyOTP);
router.post('/otp/resend', validate('sendOTP'), controller.sendOTP); // same logic as send

// Auth endpoints
router.post('/auth/refresh', validate('refreshToken'), controller.refreshToken);
router.post('/auth/logout', authenticate, controller.logout);

module.exports = router;
