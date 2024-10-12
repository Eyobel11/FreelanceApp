const Notification = require('../models/Notification'); // Assuming you have a Notification model

// Handle sending notifications
const sendNotification = async (req, res) => {
  const { userId, message } = req.body;

  // Create and save the notification to the database
  const notification = new Notification({ userId, message });
  await notification.save();

  // Emit the notification via Socket.IO
  req.io.emit('sendNotification', notification);

  res.status(201).json(notification);
};

module.exports = {
  sendNotification,
};
