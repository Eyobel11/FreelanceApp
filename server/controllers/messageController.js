const Message = require('../models/Message');

// Fetch messages by jobId (including threaded replies)
exports.getMessagesByJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    // Fetch messages with their replies
    const messages = await Message.find({ jobId, parentId: null }).sort({ createdAt: 1 }).lean();

    // Fetch replies for each message
    for (let message of messages) {
      message.replies = await Message.find({ parentId: message._id }).sort({ createdAt: 1 });
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create new message (with attachment support)
exports.createMessage = async (req, res) => {
  const { senderId, jobId, message, parentId, attachmentUrl } = req.body;

  try {
    const newMessage = new Message({
      senderId,
      jobId,
      message,
      parentId,   // Replying to another message if parentId exists
      attachmentUrl,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
