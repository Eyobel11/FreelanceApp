const express = require('express');
const { createReview, getReviewsForFreelancer } = require('../controllers/reviewController');
const router = express.Router();

// POST /api/reviews - Create a new review
router.post('/', createReview);

// GET /api/reviews/freelancer/:freelancerId - Get reviews for a freelancer
router.get('/freelancer/:freelancerId', getReviewsForFreelancer);

module.exports = router;
