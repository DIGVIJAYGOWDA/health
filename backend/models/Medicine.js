const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  medicineName: {
    type: String,
    required: [true, 'Please add a medicine name'],
  },
  dosage: {
    type: String,
    required: [true, 'Please add a dosage (e.g. 1 pill, 10ml)'],
  },
  type: {
    type: String,
    required: [true, 'Please add a medicine type'],
    enum: ['Tablet', 'Syrup', 'Capsule', 'Injection', 'Other'],
  },
  timing: {
    type: [String],
    required: [true, 'Please add timing (e.g. Morning, Evening)'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date'],
  },
  notes: {
    type: String,
  },
  image: {
    type: String,
  },
  takenStatus: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Medicine', medicineSchema);
