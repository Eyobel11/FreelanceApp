
import React, { useEffect, useState } from "react";
import { FaRegFileAlt, FaCheckCircle, FaHourglassHalf, FaCommentDots, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

const ClientDashboardDash = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications');
        setNotifications(response.data);
        setUnreadCount(response.data.filter(notif => !notif.readStatus).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`/notifications/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, readStatus: true } : notif
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await axios.post('/notifications/clear', { action: "deleteAll" });
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  return (
    <>
      {/* Main Layout */}
      <main className="flex-1 bg-gray-200 py-10 px-4 lg:px-10 mt-4">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-6 lg:mb-10">Welcome to Your Dashboard</h1>

        {/* Grid for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaRegFileAlt className="text-3xl text-green-900 mx-auto mb-3" />
            <p className="text-lg lg:text-xl">Posted Services</p>
            <p className="text-2xl">1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaCheckCircle className="text-3xl text-green-900 mx-auto mb-3" />
            <p className="text-lg lg:text-xl">Completed Services</p>
            <p className="text-2xl">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaHourglassHalf className="text-3xl text-green-900 mx-auto mb-3" />
            <p className="text-lg lg:text-xl">In Queue Services</p>
            <p className="text-2xl">1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaCommentDots className="text-3xl text-green-900 mx-auto mb-3" />
            <p className="text-lg lg:text-xl">Review</p>
            <p className="text-2xl">0</p>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mt-10 w-1/2">
          <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
          <div className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <FaBell className="text-3xl text-green-800" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button
                className="text-sm text-green-800 hover:underline"
                onClick={clearAllNotifications}
              >
                Clear All
              </button>
            </div>
            <div className="dropdown-content space-y-2">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif._id}
                    className={`notification-item p-2 rounded-lg ${
                      notif.readStatus ? 'bg-gray-50' : 'bg-red-50'
                    }`}
                  >
                    <Link
                      to={notif.link || '#'}
                      onClick={() => markAsRead(notif._id)}
                      className="text-black hover:underline"
                    >
                      {notif.message}
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No notifications</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClientDashboardDash;
