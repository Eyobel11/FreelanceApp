const express = require('express');
const router = express.Router();
const { sendMessage, getMessageThreads, getThreadById, getFreelancerThreads,getClientThreads} = require('../controllers/messageThreadController');
const protect = require('../middleware/authMiddleware');

// Route to send a message
router.post('/send', protect, sendMessage);

// Route to get all message threads for a user
router.get('/inbox', protect, getMessageThreads);

// Route to get a specific message thread by ID
router.get('/thread/:threadId', protect, getThreadById);

router.get('/freelancer/inbox', protect, getFreelancerThreads);

router.get('/client/inbox', protect, getClientThreads);




module.exports = router;
