const express = require('express');
const { sendNotification } = require('../controllers/notificationController');
const router = express.Router();

// Route for sending notifications
router.post('/', sendNotification);

module.exports = router;
