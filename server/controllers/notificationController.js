// controllers/notificationController.js

const Notification = require('../models/Notification');

// 1. Fetch all notifications for a user
const getUserNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};

// 2. Mark a notification as read
const markAsRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    await Notification.findByIdAndUpdate(notificationId, { readStatus: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Error updating notification' });
  }
};

// 3. Delete a notification
const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;

  try {
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Error deleting notification' });
  }
};

// 4. Bulk delete or mark all as read (Optional)
const clearAllNotifications = async (req, res) => {
  const userId = req.user.id;
  const { action } = req.body; // "markRead" or "deleteAll"

  try {
    if (action === "markRead") {
      await Notification.updateMany({ userId }, { readStatus: true });
      return res.status(200).json({ message: "All notifications marked as read" });
    } else if (action === "deleteAll") {
      await Notification.deleteMany({ userId });
      return res.status(200).json({ message: "All notifications deleted" });
    }
  } catch (error) {
    console.error('Error updating notifications:', error);
    res.status(500).json({ error: 'Error clearing notifications' });
  }
};


// 5. Create a notification (new function)
const createNotification = async (userId, message, type, link = null) => {
  try {
    const notification = new Notification({
      userId,
      message,
      type,
      link, // Optional link to direct the user to a relevant page
      readStatus: false,
    });
    await notification.save();
    console.log('Notification created:', notification);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

// Count all notifications for a user
const countUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationCount = await Notification.countDocuments({ userId, readStatus: false }); // Count only unread notifications
    res.status(200).json({ count: notificationCount });
  } catch (error) {
    console.error('Error counting notifications:', error.message);
    res.status(500).json({ message: 'Error counting notifications' });
  }
};

module.exports = {
  getUserNotifications,
  markAsRead,
  deleteNotification,
  clearAllNotifications,
  createNotification, // Export new function
  countUserNotifications, // <-- New export for counting notifications
};
