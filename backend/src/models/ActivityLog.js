const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, required: true }, // 'YYYY-MM-DD'
  steps: { type: Number, default: 0 },
  sleepHours: { type: Number, default: 0 },
  activeMinutes: { type: Number, default: 0 },
  waterIntakeML: { type: Number, default: 0 },
  complianceScore: { type: Number, default: 0 }
}, { timestamps: true });

activitySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('ActivityLog', activitySchema);
