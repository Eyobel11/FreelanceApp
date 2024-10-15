// server/routes/jobRoutes.js

const express = require('express');
const router = express.Router();
const { createServicePost, getServicePosts, getServicePostById, updateServicePost, deleteServicePost, upload } = require('../controllers/servicePostController');
const protect = require('../middleware/authMiddleware'); // Middleware for authentication

// Create a new job post
router.post(
    '/',
    protect,
    upload.fields([
      { name: 'featuredImage', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
    ]),
    createServicePost
  );

// Get all job posts
router.get('/', getServicePosts);

// Get a specific job post by ID
router.get('/:id', getServicePostById);

// Update a job post
router.put(
    '/:id',
    protect,
    upload.fields([
      { name: 'featuredImage', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
    ]),
    updateServicePost
  );
// Delete a job post
router.delete('/:id', protect, deleteServicePost);

module.exports = router;
