require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const otpRoutes = require('./routes/otpRoutes');
const { sequelize } = require('./config/database');

const app = express();

// ─── Security Middleware ─────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
    : ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent abuse

// Trust proxy for accurate IP addresses behind reverse proxies (Railway, Render, etc.)
app.set('trust proxy', 1);

// ─── Routes ──────────────────────────────────────────────
app.use('/', otpRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'otp-service',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ─── Global Error Handler ────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

// ─── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
  .then(() => {
    console.log('✅ Database synchronized');
    app.listen(PORT, () => {
      console.log(`🚀 OTP Service running on port ${PORT}`);
      console.log(`📱 SMS Provider: ${process.env.SMS_PROVIDER || 'console'}`);
      console.log(`🌍 Allowed Origins: ${process.env.ALLOWED_ORIGINS || 'http://localhost:5173'}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });

module.exports = app;
