const express = require('express');
const router = express.Router();
const { getReminders, updateReminderStatus, createReminder } = require('../controllers/reminderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getReminders).post(protect, createReminder);
router.route('/:id').put(protect, updateReminderStatus);

module.exports = router;
