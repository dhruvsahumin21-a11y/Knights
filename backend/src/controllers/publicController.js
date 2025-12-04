const Tip = require('../models/Tip');

exports.getTips = async (req, res) => {
  const tips = await Tip.find().sort({ createdAt: -1 }).limit(20);
  res.json(tips);
};

exports.getTodayTip = async (req, res) => {
  const tip = await Tip.findOne().sort({ createdAt: -1 });
  res.json(tip || { content: 'Stay hydrated and take a short walk today!' });
};
