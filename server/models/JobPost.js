// server/models/JobPost.js

const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    // enum: [
    //   'business', 
    //   'designer', 
    //   'digital-marketing', 
    //   'lifestyle', 
    //   'programming-tech', 
    //   'project-managers', 
    //   'web-developers', 
    //   'writing-translation',
    // ],
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance'],
  },
  jobLocationType: {
    type: String,
    required: true,
    enum: ['Onsite', 'Partial Onsite', 'Remote'],
  },
  duration: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
  },
  friendlyAddress: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  englishLevel: {
    type: String,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
  },
  gallery: {
    type: [String], // Array of URLs for gallery images
    default: [],
  },
  skills: {
    type: [String],
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('JobPost', JobPostSchema);
