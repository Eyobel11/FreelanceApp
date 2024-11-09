// server/models/ClientProfile.js

const mongoose = require('mongoose');

const ClientProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  profilePicture: {
    type: String, // URL or path to the profile image
   
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], // Basic email validation
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    // match: [/^\+?[1-9]\d{1,14}$/, 'is invalid'], // E.164 phone number format
  },
  location: {
    type: String,
    required: true,
    trim: true,
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
  friendlyAddress: {
    type: String,
    required: true,
    trim: true,
  },
  gallery: {
    type: [String], // Array of URLs or paths to gallery images
    default: [],
  },
  videoUrl: {
    type: String,
    trim: true,
    match: [
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
      'is invalid',
    ], // Basic URL validation
  },
  profileShow: {
    type: String,
    required: true,
    enum: ['show', 'hide'],
    default: 'show',
  },
  website: {
    type: String,
    trim: true,
    // match: [
    //   /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
    //   'is invalid',
    // ],
  },
  foundedDate: {
    type: Number, // Year founded
    // min: [1900, 'Founded year must be after 1900'],
    // max: [new Date().getFullYear(), 'Founded year cannot be in the future'],
  },
  employees: {
    type: Number,
    // min: [1, 'Must have at least one employee'],
  },
  responseTime: {
    type: String,
    required: true,
    trim: true,
    // enum: ['immediately', 'within a day', 'within a week', 'other'], // Example options
  },
  description: {
    type: String, // HTML or plain text from the editor
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ClientProfile', ClientProfileSchema);
