// Updated messageSchema
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
  message: { type: String, required: true },
  attachmentUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'sent' } // New field for message status
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
