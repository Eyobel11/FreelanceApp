const Bids = require('../models/Bids'); // Assuming Bid model exists

// Controller function for fetching jobs for freelancers
const freeLancerJob = async (req, res) => {
  try {
    // Get bids for the current freelancer
    const bids = await Bids.find({ freelancer: req.user._id }).populate('job');
    
    // Extract jobs from bids
    const jobs = bids.map(bid => bid.job);
    
    // Send back the jobs
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
}

module.exports = { freeLancerJob };
