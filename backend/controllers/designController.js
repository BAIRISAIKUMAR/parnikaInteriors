const Design = require('../models/Design');

// @desc    Get all designs (with optional category filter)
// @route   GET /api/designs
// @access  Public
const getDesigns = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const designs = await Design.find(filter).sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single design
// @route   GET /api/designs/:id
// @access  Public
const getDesignById = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json(design);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create design
// @route   POST /api/designs
// @access  Admin
const createDesign = async (req, res) => {
  try {
    const design = await Design.create(req.body);
    res.status(201).json(design);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update design
// @route   PUT /api/designs/:id
// @access  Admin
const updateDesign = async (req, res) => {
  try {
    const design = await Design.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json(design);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete design
// @route   DELETE /api/designs/:id
// @access  Admin
const deleteDesign = async (req, res) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json({ message: 'Design deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDesigns, getDesignById, createDesign, updateDesign, deleteDesign };
