const Job = require('../models/Jobs');

// Create a new job
const createJob = async (req, res) => {
  const { title, description, budget, category, deadline } = req.body;

  try {
    const job = new Job({
      title,
      description,
      budget,
      category,
      deadline,
      poster: req.user._id, // This will be the ID of the user posting the job
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job' });
  }
};

// Get a specific job
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving job' });
  }
};

// Get all jobs
const getJobs = async (req, res) => {
  const { skills, budgetMin, budgetMax, location, deadline } = req.query;

  let filters = {};

  if (skills) {
    filters.category = { $regex: skills, $options: 'i' }; // Assuming 'skills' is in 'category'
  }

  if (budgetMin || budgetMax) {
    filters.budget = {};
    if (budgetMin) filters.budget.$gte = Number(budgetMin);
    if (budgetMax) filters.budget.$lte = Number(budgetMax);
  }

  if (location) {
    filters.location = { $regex: location, $options: 'i' }; // Assuming 'location' is a field in the job model
  }

  if (deadline) {
    filters.deadline = { $lte: new Date(deadline) }; // Jobs with a deadline before or on the given date
  }

  try {
    const jobs = await Job.find(filters).populate('poster', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving jobs' });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.poster.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job' });
  }
};


// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.poster.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await job.remove();
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
};

module.exports = {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
};
