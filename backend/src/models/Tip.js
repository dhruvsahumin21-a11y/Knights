const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, enum: ['tip', 'alert', 'announcement'], default: 'tip' }
}, { timestamps: true });

module.exports = mongoose.model('Tip', tipSchema);
