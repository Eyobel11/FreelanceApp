// routes/authRoutes.js
const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const { googleAuth } = require('../controllers/authController');


const router = express.Router();

// Routes
router.post('/google-auth', googleAuth);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);



module.exports = router;