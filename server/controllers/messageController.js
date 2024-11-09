const Message = require('../models/Message');
const io = require('../server').io; // Export io from the main server

// Fetch messages by jobId (including their statuses)
exports.getMessagesByJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const messages = await Message.find({ jobId }).sort({ createdAt: 1 }).lean();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a new message
exports.createMessage = async (req, res) => {
  const { senderId, receiverId, jobId, message, parentId, attachmentUrl } = req.body;

  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      jobId,
      message,
      parentId,
      attachmentUrl,
      status: 'sent' // Default to 'sent' when creating a new message
    });

    const savedMessage = await newMessage.save();

    // Notify the receiver if they are online
    const receiverSocketId = global.onlineUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', savedMessage);
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update message status (to 'delivered' or 'read')
exports.updateMessageStatus = async (req, res) => {
  const { messageId, status } = req.body;

  try {
    const message = await Message.findByIdAndUpdate(messageId, { status }, { new: true });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
