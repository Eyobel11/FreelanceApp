const express = require('express');
const router = express.Router();
const { getMessagesByJob, createMessage } = require('../controllers/messageController');

// Route to get messages by jobId
router.get('/:jobId', getMessagesByJob);

// Route to send a new message (supports replies and attachments)
router.post('/', createMessage);

module.exports = router;
