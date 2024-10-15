const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfile, updateProfile, upload } = require('../controllers/clientProfileController');
const protect  = require('../middleware/authMiddleware')

// Create or update profile (with file upload)
router.post('/', protect, upload.any('profilePicture','gallery'), createOrUpdateProfile);  // Create or update profile
router.get('/:id', getProfile);  // Get profile by ID

// Update profile (with file upload)
router.put('/edit',protect, upload.any('profilePicture','gallery'), updateProfile);

module.exports = router;
