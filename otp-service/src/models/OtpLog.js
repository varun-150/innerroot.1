const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OtpLog = sequelize.define('OtpLog', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  otpHash: {
    type: DataTypes.STRING(255),
    field: 'otp_hash',
    allowNull: false
  },
  purpose: {
    type: DataTypes.ENUM('LOGIN', 'SIGNUP', 'RESET'),
    defaultValue: 'LOGIN'
  },
  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  maxAttempts: {
    type: DataTypes.INTEGER,
    field: 'max_attempts',
    defaultValue: 3
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    field: 'is_used',
    defaultValue: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    field: 'expires_at',
    allowNull: false
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    field: 'ip_address',
    allowNull: true
  },
  userAgent: {
    type: DataTypes.STRING(500),
    field: 'user_agent',
    allowNull: true
  }
}, {
  tableName: 'otp_logs',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = OtpLog;
