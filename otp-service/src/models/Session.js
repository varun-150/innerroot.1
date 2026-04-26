const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.BIGINT,
    field: 'user_id',
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.STRING(500),
    field: 'refresh_token',
    allowNull: false
  },
  deviceInfo: {
    type: DataTypes.STRING(500),
    field: 'device_info',
    allowNull: true
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    field: 'ip_address',
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  },
  expiresAt: {
    type: DataTypes.DATE,
    field: 'expires_at',
    allowNull: false
  }
}, {
  tableName: 'sessions',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Session;
