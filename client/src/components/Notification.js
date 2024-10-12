import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Your server URL

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('receiveNotification', (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off('receiveNotification');
    };
  }, []);

  return (
    <div className="absolute top-16 right-5 bg-white border border-gray-300 shadow-lg rounded-lg p-4 w-64">
      <h4 className="font-semibold text-lg mb-2">Notifications</h4>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className="p-2 border-b border-gray-200 flex justify-between">
              <span>{notification.message}</span>
              <span className="text-xs text-gray-400">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
