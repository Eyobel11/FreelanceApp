import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const MessageInbox = () => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/messaging/inbox')
      .then(response => setThreads(response.data))
      .catch(error => console.error('Error fetching threads:', error));
  }, []);

  const openThread = (threadId) => {
    navigate(`/messages/thread/${threadId}`);
  };

  return (
    <div className="inbox">
      <h2>Inbox</h2>
      {threads.map(thread => (
        <div key={thread._id} onClick={() => openThread(thread._id)}>
          <p>Service: {thread.serviceId.title}</p>
          <p>With: {thread.clientId ? thread.clientId.fullName : thread.freelancerId.fullName}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageInbox;
