const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Medicine',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  reminderTime: {
    type: Date,
    required: [true, 'Please add a reminder time'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Taken', 'Missed'],
    default: 'Pending',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reminder', reminderSchema);
