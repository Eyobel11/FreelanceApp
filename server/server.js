const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Message = require('./models/Message'); // Import the Message model

// Load environment variables
dotenv.config();
const app = express();

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads/profile-pictures');
const uploadDirs = path.join(__dirname, 'uploads/attachments');
const uploadDirJob = path.join(__dirname, 'uploads/job-images');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads directory created:', uploadDir);
}

if (!fs.existsSync(uploadDirs)) {
  fs.mkdirSync(uploadDirs, { recursive: true });
  console.log('Uploads attachments directory created:', uploadDirs);
}

if (!fs.existsSync(uploadDirJob)) {
  fs.mkdirSync(uploadDirJob, { recursive: true });
  console.log('Uploads attachments directory created:', uploadDirJob);
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
  }
});

global.onlineUsers = {};



io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('registerUser', (userId) => {
    global.onlineUsers[userId] = socket.id;
  });

  socket.on('sendMessage', async (message) => {
    try {
      console.log('Received message:', message); // Log the message to see the incoming data
  
      // Validate and convert senderId and receiverId to ObjectId
      if (mongoose.Types.ObjectId.isValid(message.senderId)) {
        message.senderId = new mongoose.Types.ObjectId(message.senderId);
      } else {
        throw new Error('Invalid senderId');
      }
  
      if (mongoose.Types.ObjectId.isValid(message.receiverId)) {
        message.receiverId = new mongoose.Types.ObjectId(message.receiverId);
      } else {
        throw new Error('Invalid receiverId');
      }
  
      const newMessage = new Message(message);
      const savedMessage = await newMessage.save();
  
      // Notify the receiver if they are online
      const receiverSocketId = global.onlineUsers[message.receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', savedMessage);
  
        // Update message status to 'delivered'
        savedMessage.status = 'delivered';
        await savedMessage.save();
      }
  
      // Notify sender about the message status update
      socket.emit('messageStatus', { messageId: savedMessage._id, status: 'delivered' });
  
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });
  

  socket.on('messageRead', async (messageId) => {
    try {
      // Update the message status to 'read'
      const message = await Message.findByIdAndUpdate(messageId, { status: 'read' }, { new: true });

      if (message) {
        const senderSocketId = global.onlineUsers[message.senderId];
        if (senderSocketId) {
          io.to(senderSocketId).emit('messageStatus', { messageId: message._id, status: 'read' });
        }
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  });

  socket.on('disconnect', () => {
    const userId = Object.keys(global.onlineUsers).find(key => global.onlineUsers[key] === socket.id);
    if (userId) {
      delete global.onlineUsers[userId];
    }
    console.log('User disconnected:', socket.id);
  });
});


// Define Routes
const authRoutes = require('./routes/authRoutes');


const messageRoutes = require('./routes/messageRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


const notificationRoutes = require('./routes/notificationRoutes');

const clientprofileRoutes = require('./routes/clientProfileRoutes');
const jobPostRoutes = require('./routes/jobPostRoutes');
const freelancerprofileRoutes = require('./routes/freelancerProfileRoutes');
const servicePostRoutes = require('./routes/servicePostRoutes');
const emailRoutes = require('./routes/emailRoutes'); // Import the email routes
const proposalRoutes = require('./routes/proposalRoutes');
const messageJobRoutes = require('./routes/messageJobRoutes');

const messagingRoutes = require('./routes/messagingRoutes');
 

// Routes middleware

app.use('/api/clientprofile', clientprofileRoutes);
app.use('/api/freelancerprofile', freelancerprofileRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/message', messageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);

app.use('/api/jobpost', jobPostRoutes);
app.use('/api/servicepost', servicePostRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/messagesjob', messageJobRoutes);
app.use('/api/messaging', messagingRoutes);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirs),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('attachment'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(200).json({ fileUrl: `/uploads/attachments/${req.file.filename}` });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
