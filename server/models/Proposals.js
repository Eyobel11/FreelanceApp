// models/Proposals.js

const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FreelancerProfile',
    required: true
  },
  title: {
    type: String,
    ref: 'JobPost',
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
    required: true
  },
  clientId: {  // New clientId field for easy reference
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientProfile',  // Adjust according to your client model
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  proposedRate: {
    type: Number,
    required: true
  },
  estimatedTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  attachments :{
    type :[String]
  }
});

module.exports = mongoose.model('Proposal', proposalSchema);
