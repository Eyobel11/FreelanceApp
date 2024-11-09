const mongoose = require('mongoose');
const MessageThread = require('../models/MessageThread');
const User = require('../models/User'); // Assuming you have a User model
const { createNotification } = require('./notificationController'); // Import the notification creation function


const sendMessage = async (req, res) => {
  let { serviceId, clientId, freelancersId, senderId, content } = req.body;

  // Ensure IDs are in string format
  serviceId = serviceId._id ? serviceId._id : serviceId;
  clientId = clientId._id ? clientId._id : clientId;
  freelancersId = freelancersId._id ? freelancersId._id : freelancersId;

  console.log('Incoming data for sendMessage:', { serviceId, clientId, freelancersId, senderId, content });

  if (!serviceId || !clientId || !freelancersId || !senderId || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const query = {
      serviceId: new mongoose.Types.ObjectId(serviceId),
      clientId: new mongoose.Types.ObjectId(clientId),
      freelancersId: new mongoose.Types.ObjectId(freelancersId),
    };

    let thread = await MessageThread.findOne(query);

    if (!thread) {
      console.log('No existing thread found. Creating a new one with:', query);
      thread = new MessageThread({
        ...query,
        messages: [{ senderId: new mongoose.Types.ObjectId(senderId), content }],
      });
    } else {
      console.log('Thread found. Appending new message to existing thread:', thread._id);
      thread.messages.push({ senderId: new mongoose.Types.ObjectId(senderId), content });
    }

    await thread.save();

    // Identify the recipient for the notification
    const recipientId = senderId === clientId ? freelancersId : clientId;
    const notificationMessage = 'You have a new message in your message thread';
    const notificationLink = `/messages/thread/${thread._id}`;

    // Trigger notification for the recipient
    await createNotification(recipientId, notificationMessage, 'message', notificationLink);

    res.status(200).json(thread);
  } catch (error) {
    console.error('Error in sendMessage controller:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
};



  

// 2. Get message threads for a user
const getMessageThreads = async (req, res) => {
  const userId = req.user.id; // Assuming authenticated user

  try {
    const threads = await MessageThread.find({
      $or: [{ clientId: userId }, { freelancersId: userId }],
    })
    .populate('serviceId', 'title') // Populate service info for reference
    .populate('clientId', 'fullName')
    .populate('freelancersId', 'fullName');

    res.status(200).json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching message threads' });
  }
};

// Get messages in a specific thread by threadId
const getThreadById = async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await MessageThread.findById(threadId)
      .populate('messages.senderId', 'fullName') // Populate sender details in messages
      .populate('clientId', 'fullName')
      .populate('freelancersId', 'fullName')
      .populate('serviceId', 'title');

    if (!thread) return res.status(404).json({ error: 'Thread not found' });

    res.status(200).json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching message thread' });
  }
};

// Get all message threads for a freelancer
const getFreelancerThreads = async (req, res) => {
  const freelancerId = req.user.id; // Assuming authenticated freelancer

  try {
    const threads = await MessageThread.find({ freelancersId: freelancerId })
      .populate('clientId', 'fullName') // Populate client's details
      .populate('serviceId', 'title')    // Populate service title
      .sort({ updatedAt: -1 });          // Sort by latest messages

    res.status(200).json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching freelancer threads' });
  }
};
// Get all message threads for a client
const getClientThreads = async (req, res) => {
  const clientId = req.user.id; // Assuming authenticated client

  try {
    const threads = await MessageThread.find({ clientId })
      .populate('freelancersId', 'fullName') // Populate freelancer's details
      .populate('serviceId', 'title')        // Populate service title
      .sort({ updatedAt: -1 });              // Sort by latest messages

    res.status(200).json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching client threads' });
  }
};




module.exports = {
    sendMessage,
    getMessageThreads,
    getThreadById,
    getFreelancerThreads, 
    getClientThreads, // Export new function

}