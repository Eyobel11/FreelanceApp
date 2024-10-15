const express = require('express');
const router = express.Router();
const {
  createOrUpdateFreelancerProfile,
  getFreelancerProfile,
  updateFreelancerProfile,
  upload,
} = require('../controllers/freelancerProfileController');
const protect = require('../middleware/authMiddleware');

// Create or update freelancer profile (with file upload)
router.post('/', protect, upload.fields([{ name: 'profileImage' }, { name: 'resume' }]), createOrUpdateFreelancerProfile);

// Get freelancer profile by user ID
router.get('/:id', getFreelancerProfile);

// Update freelancer profile (with file upload)
router.put('/edit', protect, upload.fields([{ name: 'profileImage' }, { name: 'resume' }]), updateFreelancerProfile);

module.exports = router;
