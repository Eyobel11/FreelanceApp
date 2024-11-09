// routes/conversationRoutes.js
const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Messages');

// Create or get conversation
router.post('/', async (req, res) => {
  const { userId1, userId2, serviceId } = req.body;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [userId1, userId2] },
      service: serviceId,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId1, userId2],
        service: serviceId,
      });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error creating/retrieving conversation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// routes/conversationRoutes.js
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const conversations = await Conversation.find({
        participants: userId,
      })
        .populate('participants', 'name')
        .populate('service', 'title')
        .populate('lastMessage');
  
      res.status(200).json(conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  

module.exports = router;
