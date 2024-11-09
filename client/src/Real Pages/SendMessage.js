import React, { useState } from 'react';
import axios from '../utils/axios';

const SendMessage = ({ senderId, receiverId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/messages', { senderId, receiverId, content });
      setContent('');  // Clear the input after sending
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message here..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
