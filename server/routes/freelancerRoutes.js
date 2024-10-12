// routes/freelancerRoutes.js
const express = require('express');
const  protect  = require('../middleware/authMiddleware');

const {freeLancerJob} = require('../controllers/freelancerController')

const router = express.Router();

// Fetch jobs that the freelancer has applied for
router.get('/jobs', protect, freeLancerJob);

module.exports = router;
