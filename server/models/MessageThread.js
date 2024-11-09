const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageThreadSchema = new Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  freelancersId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

messageThreadSchema.index({ clientId: 1, freelancersId: 1, serviceId: 1 }, { unique: true });


module.exports = mongoose.model('MessageThread', messageThreadSchema);
