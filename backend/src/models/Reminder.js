const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  recurrence: { type: String, enum: ['none', 'annual', 'monthly'], default: 'none' },
  status: { type: String, enum: ['pending', 'completed', 'missed'], default: 'pending' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
