
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  
  profileImage: {
    type: String, // URL or file path for the profile image
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    // enum: ['Web Development', 'Designing', 'Music & Audio', 'Voice Over'], // Add more as needed
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  responseTime: {
    type: String,
    required: true,
  },
  servicePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  englishLevel: {
    type: String,
    required: true,
    // enum: ['Fluent', 'Intermediate', 'Basic'], // Possible values for English proficiency
  },

  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String, // Store the path or URL of the image
    required: false,
  },
  gallery: [{
    type: String, // Array of image paths/URLs
    required: false,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
