const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', createEnquiry);
router.get('/', protect, adminOnly, getEnquiries);
router.put('/:id', protect, adminOnly, updateEnquiryStatus);
router.delete('/:id', protect, adminOnly, deleteEnquiry);

module.exports = router;
