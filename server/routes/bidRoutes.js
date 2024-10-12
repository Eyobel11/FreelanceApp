const express = require('express');
const { createBid, getBidsForJob } = require('../controllers/bidController');
const  protect  = require('../middleware/authMiddleware');
const router = express.Router();

// Routes for Bids
router.post('/:jobId', protect, createBid); // Create a bid for a specific job
router.get('/:jobId', getBidsForJob);       // Get all bids for a specific job

module.exports = router;
