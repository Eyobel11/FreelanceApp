import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';

const MessageThread = () => {
  const { threadId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [threadDetails, setThreadDetails] = useState(null);

  const currentUserId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    const fetchThreadDetails = async () => {
      try {
        const response = await axios.get(`/messaging/thread/${threadId}`);
        const { clientId, freelancersId, serviceId, messages } = response.data;
        setThreadDetails({ clientId, freelancersId, serviceId });
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    if (threadId) fetchThreadDetails();
  }, [threadId]);

  const sendMessage = async () => {
    if (!threadDetails) return;
    try {
      const response = await axios.post(`/messaging/send`, { 
        serviceId: threadDetails.serviceId,
        clientId: threadDetails.clientId,
        freelancersId: threadDetails.freelancersId,
        senderId: currentUserId,
        content: messageContent 
      });
      setMessages(response.data.messages);
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleContentChange = (e) => {
    const maxCharsPerLine = 50; // Set your desired character limit per line
    let content = e.target.value;
    
    // Automatically insert line breaks after the specified character limit per line
    content = content
      .split('\n')
      .map(line => {
        if (line.length > maxCharsPerLine) {
          // Insert line breaks at the specified character limit
          return line.match(new RegExp(`.{1,${maxCharsPerLine}}`, 'g')).join('\n');
        }
        return line;
      })
      .join('\n');
    
    setMessageContent(content);
  };

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="message-thread bg-gray-100 min-h-screen flex flex-col items-center py-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <header className="bg-blue-600 text-white py-3 px-5 rounded-t-lg flex items-center justify-between">
          <h2 className="text-xl font-bold">Conversation</h2>
        </header>

        <div className="message-list p-6 space-y-4 overflow-y-auto overflow-x-hidden max-h-96 bg-gray-50">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-xl w-auto ${
                    msg.senderId === currentUserId 
                      ? 'bg-blue-500 text-white rounded-tr-none' 
                      : 'bg-gray-300 text-gray-900 rounded-tl-none'
                  } shadow-md`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className="text-xs text-gray-200 mt-1 block text-right">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages to display.</p>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center space-x-2 bg-white">
          <textarea
            value={messageContent}
            onChange={handleContentChange}
            placeholder="Type a message..."
            className="border border-gray-300 rounded-lg w-full resize-none px-4 py-2 focus:ring-2 focus:ring-blue-500"
            rows={3}
            style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
          />
          <button 
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
