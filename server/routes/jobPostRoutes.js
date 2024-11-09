// server/routes/jobRoutes.js

const express = require('express');
const router = express.Router();
const { createJobPost, getJobPosts, getJobPostById, updateJobPost, deleteJobPost, upload, getJobsByClient } = require('../controllers/jobPostController');
const protect = require('../middleware/authMiddleware'); // Middleware for authentication

// Create a new job post
router.post(
    '/',
    protect,
    upload.fields([
      { name: 'featuredImage', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
    ]),
    createJobPost
  );

// Get all job posts
router.get('/', getJobPosts);

// Get a specific job post by ID
router.get('/:id', getJobPostById);

router.get('/client/:clientId', getJobsByClient);

// Update a job post
router.put(
    '/:id',
    protect,
    upload.fields([
      { name: 'featuredImage', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
    ]),
    updateJobPost
  );
// Delete a job post
router.delete('/:id', protect, deleteJobPost);

module.exports = router;
