import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import Swal from 'sweetalert2';

const FreelancerInbox = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get('/messaging/freelancer/inbox');
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



  const handleDelete = async (threadId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      if (!result.isConfirmed) return;
  
      // Proceed with the deletion if confirmed
      await axios.delete(`/messaging/thread/${threadId}`);
      setThreads((prevThreads) => prevThreads.filter((thread) => thread._id !== threadId));
  
      Swal.fire({
        title: 'Deleted!',
        text: 'The thread has been deleted.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      console.error('Error deleting thread:', error);
  
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the thread. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="freelancer-inbox min-h-screen bg-gray-100 py-8 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Messages</h2>
      <div className="w-full max-w-3xl space-y-4">
        {threads.length > 0 ? (
          threads.map((thread) => (
            <div 
              key={thread._id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg font-bold text-green-700">Service: {thread.serviceId?.title || 'No Title'}</h3>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Client:</span> {thread.clientId?.name || 'Unknown Client'}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Last Message:</span> {thread.messages[thread.messages.length - 1]?.content || 'No messages yet'}
              </p>
              <Link 
                to={`/messages/thread/${thread._id}`} 
                className="inline-block mt-4 text-green-600 font-semibold hover:text-green-700"
              >
                View Conversation &rarr;
              </Link>

              <button
                onClick={() => handleDelete(thread._id)}
                className="text-red-600 font-semibold hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerInbox;
