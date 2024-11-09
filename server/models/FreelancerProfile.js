const mongoose = require('mongoose');

const FreelancerProfileSchema = new mongoose.Schema({
  profileImage: {
    type: String, // URL or file path for the profile image
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  phone: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
  },
  minRate: {
    type: Number,
    required: true,
  },
  maxRate: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    
  },
  dob: {
    type: Date,
    default: Date.now(),
  },
  freelancerType: {
    type: String,
    // enum: ['full-time', 'part-time', 'contract'],
  },
  category: {
    type: String,
    trim: true,
  },
  friendlyAddress: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  gallery: [
    {
      type: String, // Array of URLs or file paths for gallery images
    }
  ],
  resume: {
    type: [String], // URL or file path for the resume file
  },
  videoUrl: {
    type: String,
    trim: true,
  },
  awards: [
    {
      type: String,
      trim: true,
    }
  ],
  educations: [
    {
      type: String,
      trim: true,
    }
  ],
  works: [
    {
      type: String,
      trim: true,
    }
  ],
  skills: [
    {
      type: String,
      trim: true,
    }
  ],
  faqs: [
    {
      type: String,
      trim: true,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('FreelancerProfile', FreelancerProfileSchema);
