const User = require('./User');
const OtpLog = require('./OtpLog');
const Session = require('./Session');
const RateLimit = require('./RateLimit');
const ActivityLog = require('./ActivityLog');

// Associations
User.hasMany(Session, { foreignKey: 'user_id', as: 'sessions' });
Session.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(ActivityLog, { foreignKey: 'user_id', as: 'activityLogs' });
ActivityLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  User,
  OtpLog,
  Session,
  RateLimit,
  ActivityLog
};
