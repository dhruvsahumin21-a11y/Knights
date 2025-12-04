const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  dailyStepsTarget: { type: Number, default: 8000 },
  dailySleepTarget: { type: Number, default: 8 },
  waterIntakeTargetML: { type: Number, default: 2000 }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
