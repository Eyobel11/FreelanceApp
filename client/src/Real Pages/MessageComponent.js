import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from '../utils/axios';

const socket = io.connect('http://localhost:5000'); // Replace with your server's URL

const MessageComponent = () => {
  const { senderId, receiverId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/messagesjob/conversation/${senderId}/${receiverId}`);
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();

    // Listen for incoming messages from the server
    socket.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.off('receive_message');
    };
  }, [senderId, receiverId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        senderId,
        receiverId,
        content: message,
        timestamp: new Date(),
      };

      socket.emit('send_message', newMessage);

      try {
        await axios.post('/messagesjob/send', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
      } catch (error) {
        console.error('Error saving message:', error);
      }
    }
  };

  return (
    <div className="message-thread bg-gray-100 min-h-screen flex flex-col items-center py-6 overflow-x-hidden">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-x-hidden">
        <header className="bg-blue-600 text-white py-3 px-5 rounded-t-lg flex items-center justify-center">
          <h1 className="text-2xl font-bold">Messages</h1>
        </header>

        {/* Message Display */}
        <div className="message-list p-6 space-y-4 overflow-y-auto max-h-96 bg-gray-50 overflow-x-hidden">
          {loading ? (
            <p>Loading messages...</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.senderId === senderId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-xl w-auto max-w-lg ${
                    msg.senderId === senderId
                      ? 'bg-blue-500 text-white rounded-tr-none'
                      : 'bg-gray-300 text-gray-900 rounded-tl-none'
                  } shadow-md`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-200 mt-1 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 flex items-center bg-white">
          <input
            type="text"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
