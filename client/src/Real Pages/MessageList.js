import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const MessageList = ({ userId1, userId2 }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/messages/conversation/${userId1}/${userId2}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    fetchMessages();
  }, [userId1, userId2]);

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div key={msg._id} className={`message ${msg.senderId === userId1 ? 'sent' : 'received'}`}>
          <p>{msg.content}</p>
          <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
