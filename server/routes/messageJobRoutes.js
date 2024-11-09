// routes/messages.js
const express = require('express');
const router = express.Router();
const { sendMessage, getConversation } = require('../controllers/messageJobController'); // Adjusted the import

// Route to send a message
router.post('/send', sendMessage);

// Route to get a conversation between two users
router.get('/conversation/:userId1/:userId2', getConversation);

module.exports = router;
