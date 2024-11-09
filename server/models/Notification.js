// models/Notification.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['message','Post', 'job', 'proposal', 'system', 'other','Service', 'Proposal', 'Message','Profile'],
    default: 'other',
  },
  link: String, // URL or path for action-based navigation
  readStatus: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
