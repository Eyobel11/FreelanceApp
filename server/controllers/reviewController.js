const Review = require('../models/Review');
const Job = require('../models/Jobs');

exports.createReview = async (req, res) => {
  try {
    const { rating, reviewText, jobId, freelancerId, clientId } = req.body;

    // Ensure the job has been completed before allowing a review
    // const job = await Job.findById(jobId);
    // if (!job || job.status !== 'completed') {
    //   return res.status(400).json({ error: 'Job must be completed to leave a review' });
    // }

    // Check if a review for this job has already been posted
    const existingReview = await Review.findOne({ job: jobId, client: clientId });
    if (existingReview) {
      return res.status(400).json({ error: 'Review for this job already exists' });
    }

    // Create the review
    const newReview = new Review({
      rating,
      reviewText,
      job: jobId,
      freelancer: freelancerId,
      client: clientId
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsForFreelancer = async (req, res) => {
  try {
    const freelancerId = req.params.freelancerId;
    const reviews = await Review.find({ freelancer: freelancerId }).populate('client job');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
