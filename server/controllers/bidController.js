const Bid = require('../models/Bids');
const Job = require('../models/Jobs');

// Create a bid
const createBid = async (req, res) => {
  const { amount, message } = req.body;

  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const bid = new Bid({
      job: req.params.jobId,
      freelancer: req.user._id, // ID of the freelancer placing the bid
      amount,
      message,
    });

    const savedBid = await bid.save();
    res.status(201).json(savedBid);
  } catch (error) {
    res.status(500).json({ message: 'Error placing bid' });
  }
};

// Get all bids for a specific job
const getBidsForJob = async (req, res) => {
  try {
    const bids = await Bid.find({ job: req.params.jobId }).populate('freelancer', 'name email');
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bids' });
  }
};

module.exports = {
  createBid,
  getBidsForJob,
};
