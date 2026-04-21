const Enquiry = require('../models/Enquiry');

// @desc    Submit enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Admin
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('designId', 'title category')
      .sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Admin
const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Admin
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createEnquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry };
