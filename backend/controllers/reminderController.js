const Reminder = require('../models/Reminder');
const Medicine = require('../models/Medicine');

// @desc    Get reminders for user
// @route   GET /api/reminders
// @access  Private
const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id }).populate('medicineId');
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a reminder manually
// @route   POST /api/reminders
// @access  Private
const createReminder = async (req, res) => {
  try {
    const { medicineId, reminderTime } = req.body;

    if (!medicineId || !reminderTime) {
      return res.status(400).json({ message: 'Please provide medicineId and reminderTime' });
    }

    // Verify medicine belongs to user
    const medicine = await Medicine.findById(medicineId);
    if (!medicine || medicine.userId.toString() !== req.user.id) {
        return res.status(404).json({ message: 'Medicine not found or unauthorized' });
    }

    const reminder = await Reminder.create({
      medicineId,
      userId: req.user.id,
      reminderTime
    });

    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update reminder status
// @route   PUT /api/reminders/:id
// @access  Private
const updateReminderStatus = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    if (reminder.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedReminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json(updatedReminder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getReminders,
  createReminder,
  updateReminderStatus
};
