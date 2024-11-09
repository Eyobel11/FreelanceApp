// models/Conversation.js
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Assuming 'User' model exists
      required: true,
    },
  ],
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',  // Reference the service being discussed
    required: true,
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
