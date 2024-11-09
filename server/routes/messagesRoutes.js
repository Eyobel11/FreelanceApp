// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// Send a message
// routes/messageRoutes.js
router.post('/', async (req, res) => {
    const { conversationId, senderId, text } = req.body;
  
    try {
      const message = await Message.create({
        conversationId,
        sender: senderId,
        text,
        status: 'sent', // Default to 'sent' status
      });
  
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: message._id,
        updatedAt: Date.now(),
      });
  
      res.status(201).json(message);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// routes/messageRoutes.js
router.get('/:conversationId', async (req, res) => {
    const { conversationId } = req.params;
  
    try {
      const messages = await Message.find({ conversationId });
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // routes/messageRoutes.js

// Mark messages as 'read' or 'delivered'
router.put('/:conversationId/status', async (req, res) => {
    const { conversationId } = req.params;
    const { status } = req.body;
  
    if (!['delivered', 'read'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
  
    try {
      await Message.updateMany(
        { conversationId, status: { $ne: status } },
        { status }
      );
      res.status(200).json({ message: `Messages marked as ${status}` });
    } catch (error) {
      console.error('Error updating message status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
