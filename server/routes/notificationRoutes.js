// routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const { getUserNotifications, markAsRead, deleteNotification, clearAllNotifications, countUserNotifications } = require('../controllers/notificationController');
const protect = require('../middleware/authMiddleware'); // Authentication middleware

router.get('/', protect, getUserNotifications);
router.put('/:notificationId/read', protect, markAsRead);
router.delete('/:notificationId', protect, deleteNotification);
router.post('/clear', protect, clearAllNotifications);
router.get('/count', protect, countUserNotifications); // Route for counting notifications


module.exports = router;
