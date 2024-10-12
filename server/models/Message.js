const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null }, // New field for threaded replies
  message: { type: String, required: true },
  attachmentUrl: { type: String },  // For storing attachment URL if present
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
