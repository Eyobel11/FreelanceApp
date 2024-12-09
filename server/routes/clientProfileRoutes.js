const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfile, updateProfile, upload } = require('../controllers/clientProfileController');
const protect  = require('../middleware/authMiddleware')

// Create or update profile (with file upload)
router.post('/', protect, upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), createOrUpdateProfile);
router.get('/:id', getProfile);  // Get profile by ID

// Update profile (with file upload)
router.put('/edit',protect, upload.any('profilePicture','gallery'), updateProfile);

module.exports = router;

