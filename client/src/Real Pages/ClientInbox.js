import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

const ClientInbox = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get('/messaging/client/inbox');
        setThreads(response.data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  if (loading) return <p className="text-center mt-8 text-gray-500">Loading inbox...</p>;

  return (
    <div className="client-inbox min-h-screen bg-gray-100 py-8 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Conversations</h2>
      <div className="w-full max-w-3xl space-y-4">
        {threads.length > 0 ? (
          threads.map((thread) => (
            <div 
              key={thread._id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg font-bold text-blue-700">Service: {thread.serviceId?.title || 'No Title'}</h3>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Freelancer:</span> {thread.freelancersId?.name || 'Unknown Freelancer'}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Last Message:</span> {thread.messages[thread.messages.length - 1]?.content || 'No messages yet'}
              </p>
              <Link 
                to={`/messages/thread/${thread._id}`} 
                className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-700"
              >
                View Conversation &rarr;
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No conversations found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientInbox;
