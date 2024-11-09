const express = require('express');
const router = express.Router();
const { getMessagesByJob, createMessage, updateMessageStatus } = require('../controllers/messageController');

// Route to get messages by jobId
router.get('/:jobId', getMessagesByJob);

// Route to send a new message
router.post('/', createMessage);

// Route to update message status
router.put('/status', updateMessageStatus);

module.exports = router;
