const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  contact: {
    email: String,
    phone: String,
  },
  socialLinks: {
    linkedin: String,
    github: String,
    website: String
  },
  profilePicture: {
    type: String,
    default: ''
  },
  experience: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
