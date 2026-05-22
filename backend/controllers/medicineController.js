const Medicine = require('../models/Medicine');
const Reminder = require('../models/Reminder');

// @desc    Get medicines
// @route   GET /api/medicines
// @access  Private
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.user.id });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Set medicine
// @route   POST /api/medicines
// @access  Private
const setMedicine = async (req, res) => {
  try {
    if (!req.body.medicineName || !req.body.dosage || !req.body.type || !req.body.timing || !req.body.startDate || !req.body.endDate) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    let timingArray = req.body.timing;
    if (typeof req.body.timing === 'string') {
        try {
            timingArray = JSON.parse(req.body.timing);
        } catch(e) {
            timingArray = [req.body.timing];
        }
    }

    const medicineData = {
      userId: req.user.id,
      medicineName: req.body.medicineName,
      dosage: req.body.dosage,
      type: req.body.type,
      timing: timingArray,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      notes: req.body.notes || '',
    };

    if (req.file) {
      medicineData.image = `/uploads/${req.file.filename}`;
    }

    const medicine = await Medicine.create(medicineData);

    // Create Reminders based on timing and start/end dates
    // For simplicity in this demo, let's create today's reminders immediately if it falls in range
    // A robust system would use node-cron to generate them daily
    
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update medicine
// @route   PUT /api/medicines/:id
// @access  Private
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the medicine user
    if (medicine.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    let updateData = { ...req.body };
    if (req.body.timing && typeof req.body.timing === 'string') {
        try {
            updateData.timing = JSON.parse(req.body.timing);
        } catch(e) {
            updateData.timing = [req.body.timing];
        }
    }

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete medicine
// @route   DELETE /api/medicines/:id
// @access  Private
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the medicine user
    if (medicine.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await medicine.deleteOne();

    // Delete associated reminders
    await Reminder.deleteMany({ medicineId: req.params.id });

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getMedicines,
  setMedicine,
  updateMedicine,
  deleteMedicine,
};
