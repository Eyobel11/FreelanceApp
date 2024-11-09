// controllers/messagesController.js
const Message = require('../models/MessageJob');
const Notification = require('../models/Notification'); // Import Notification model


// Send a message
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const message = new Message({ senderId, receiverId, content, timestamp: new Date() });
    const savedMessage = await message.save();

    // Notify the receiver about the new message
    const notification = new Notification({
      userId: receiverId,
      type: 'Message',
      message: 'You have received a new message from your proposal.',
      readStatus: false,
      link:`/messagesjob/${senderId}/${receiverId}`
    });
    await notification.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};


// Get a conversation between two users
exports.getConversation = async (req, res) => {
  const { userId1, userId2 } = req.params;

  try {
    // Find all messages in the conversation between userId1 and userId2, sorted by timestamp
    const conversation = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    }).sort({ timestamp: 1 }); // Sort by ascending order of timestamp

    if (!conversation.length) {
      return res.status(404).json({ message: 'No conversation found between these users.' });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error.message);
    res.status(500).json({ message: 'Failed to fetch conversation', error: error.message });
  }
};
