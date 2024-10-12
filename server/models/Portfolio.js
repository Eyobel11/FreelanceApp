const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, maxlength: 500 },
  link: { type: String },  // Could be a live project link
  images: { type: [String] }  // For storing project screenshots
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
