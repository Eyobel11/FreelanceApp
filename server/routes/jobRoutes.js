const express = require('express');
const { createJob, getJob, getJobs, updateJob, deleteJob } = require('../controllers/jobController');
const  protect  = require('../middleware/authMiddleware'); // middleware for protected routes
const router = express.Router();

// Routes for Job
router.post('/', protect, createJob); // Create a job
router.get('/:id', getJob);           // Get a specific job by ID
router.get('/', getJobs);             // Get all jobs
router.put('/:id', protect, updateJob);  // Update a job
router.delete('/:id', protect, deleteJob); // Delete a job

module.exports = router;
