const mongoose = require('mongoose');

const designSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Exterior', 'Other'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    images: [
      {
        type: String, // URLs to images
      },
    ],
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Design', designSchema);
