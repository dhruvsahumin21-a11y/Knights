const ActivityLog = require('../models/ActivityLog');
const Goal = require('../models/Goal');
const Reminder = require('../models/Reminder');

function computeCompliance(log, goals) {
  if (!log || !goals) return 0;
  let score = 0, total = 0;

  if (goals.dailyStepsTarget) {
    total++;
    if (log.steps >= goals.dailyStepsTarget) score++;
  }
  if (goals.dailySleepTarget) {
    total++;
    if (log.sleepHours >= goals.dailySleepTarget) score++;
  }
  if (goals.waterIntakeTargetML) {
    total++;
    if (log.waterIntakeML >= goals.waterIntakeTargetML) score++;
  }

  return total ? Math.round((score / total) * 100) : 0;
}

exports.getDashboard = async (req, res) => {
  const userId = req.user._id;
  const today = new Date().toISOString().slice(0, 10);
  try {
    const [goals, todayLog, reminders] = await Promise.all([
      Goal.findOne({ userId }),
      ActivityLog.findOne({ userId, date: today }),
      Reminder.find({ userId }).sort({ dueDate: 1 }).limit(5)
    ]);

    const complianceScore = computeCompliance(todayLog, goals);

    res.json({
      user: req.user,
      goals,
      todayLog,
      complianceScore,
      reminders
    });
  } catch (err) {
    console.error('Dashboard error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logActivity = async (req, res) => {
  const userId = req.user._id;
  const { date, steps, sleepHours, activeMinutes, waterIntakeML } = req.body;
  const d = date || new Date().toISOString().slice(0, 10);
  try {
    let log = await ActivityLog.findOne({ userId, date: d });
    if (!log) {
      log = new ActivityLog({ userId, date: d });
    }
    if (steps != null) log.steps = steps;
    if (sleepHours != null) log.sleepHours = sleepHours;
    if (activeMinutes != null) log.activeMinutes = activeMinutes;
    if (waterIntakeML != null) log.waterIntakeML = waterIntakeML;

    const goals = await Goal.findOne({ userId });
    log.complianceScore = computeCompliance(log, goals);

    await log.save();
    res.json({ message: 'Activity logged', log });
  } catch (err) {
    console.error('Log activity error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getGoals = async (req, res) => {
  const userId = req.user._id;
  const goals = await Goal.findOne({ userId });
  res.json(goals || {});
};

exports.updateGoals = async (req, res) => {
  const userId = req.user._id;
  const update = req.body;
  const goals = await Goal.findOneAndUpdate({ userId }, update, {
    new: true,
    upsert: true
  });
  res.json(goals);
};
