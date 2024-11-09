import React from 'react';
import MessageList from './MessageList';
import SendMessage from './SendMessage';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MessagingPage = () => {
  const freelancerId = useSelector((state) => state.auth.user._id); // Get freelancer ID from Redux
  const { clientId } = useParams(); // Get client ID from route params
  
  return (
    <div className="messaging-page">
      <MessageList userId1={freelancerId} userId2={clientId} />
      <SendMessage senderId={freelancerId} receiverId={clientId} />
    </div>
  );
};

export default MessagingPage;
