import { useEffect, useState, useRef } from 'react';
import socket from '../utils/socket';
import axios from '../utils/axios';

const Chat = ({ jobId, userId }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [attachment, setAttachment] = useState(null);  // New state for attachments
  const chatWindowRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/messages/${jobId}`);
     
      setChat(res.data);
    };
    fetchMessages();

    socket.on('receiveMessage', (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });

    return () => socket.off('receiveMessage');
  }, [jobId]);

  // Scroll to latest message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  const handleAttachment = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let attachmentUrl = null;
  
    // Handle attachment upload
    if (attachment) {
      const formData = new FormData();
      formData.append('attachment', attachment);
  
      try {
        // Post formData directly
        const res = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Get the file URL from the response
        attachmentUrl = res.data.fileUrl;
      } catch (error) {
        console.error("Error uploading attachment:", error);
        return;
      }
    }
  
    const newMessage = {
      senderId: userId,
      jobId: jobId,
      message: message.trim(),
      attachmentUrl,
      timestamp: new Date(),
    };
  
    // Emit the new message via Socket.IO
    socket.emit('sendMessage', newMessage);
  
    // Clear message and attachment states
    setMessage('');
    setAttachment(null);
  };
  

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto border border-gray-300 rounded-lg bg-white shadow-md">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg text-center">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>

      <div className="flex-grow p-4 overflow-y-auto" ref={chatWindowRef}>
        {chat.map((msg, idx) => (
          <div key={idx} className={`p-3 mb-2 rounded-lg w-auto max-w-[75%] ${msg.senderId === userId ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black self-start'}`}>
            {msg.message && <p>{msg.message}</p>}
            {msg.attachmentUrl && <a href={msg.attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Attachment</a>}
            <span className="block text-xs mt-1 text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center p-3 border-t border-gray-200">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <input type="file" onChange={handleAttachment} className="ml-2" />
        <button type="submit" className="ml-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
