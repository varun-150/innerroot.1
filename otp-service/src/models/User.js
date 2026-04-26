const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: true
  },
  displayName: {
    type: DataTypes.STRING(100),
    field: 'display_name',
    allowNull: true
  },
  avatarUrl: {
    type: DataTypes.STRING(500),
    field: 'avatar_url',
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN', 'MODERATOR'),
    defaultValue: 'USER'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    field: 'is_verified',
    defaultValue: false
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    field: 'last_login_at',
    allowNull: true
  }
}, {
  tableName: 'otp_users',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = User;
