const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RateLimit = sequelize.define('RateLimit', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  identifier: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  action: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  windowStart: {
    type: DataTypes.DATE,
    field: 'window_start',
    defaultValue: DataTypes.NOW
  },
  windowSeconds: {
    type: DataTypes.INTEGER,
    field: 'window_seconds',
    defaultValue: 600
  }
}, {
  tableName: 'rate_limits',
  underscored: true,
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['identifier', 'action']
    }
  ]
});

module.exports = RateLimit;
