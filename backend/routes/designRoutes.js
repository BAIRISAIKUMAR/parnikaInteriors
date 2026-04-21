const express = require('express');
const router = express.Router();
const {
  getDesigns,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign,
} = require('../controllers/designController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getDesigns);
router.get('/:id', getDesignById);
router.post('/', protect, adminOnly, createDesign);
router.put('/:id', protect, adminOnly, updateDesign);
router.delete('/:id', protect, adminOnly, deleteDesign);

module.exports = router;
