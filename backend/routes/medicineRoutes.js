const express = require('express');
const router = express.Router();
const {
  getMedicines,
  setMedicine,
  updateMedicine,
  deleteMedicine,
} = require('../controllers/medicineController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(protect, getMedicines).post(protect, upload.single('image'), setMedicine);
router.route('/:id').put(protect, upload.single('image'), updateMedicine).delete(protect, deleteMedicine);

module.exports = router;
