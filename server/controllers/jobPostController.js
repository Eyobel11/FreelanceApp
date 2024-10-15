// server/controllers/jobController.js

const JobPost = require('../models/JobPost');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads/job-images' directory exists
const uploadDir = 'uploads/job-images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage for job images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  };
  
  // Set up the Multer upload
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
    fileFilter,
  });

// Create a new job post
const createJobPost = async (req, res) => {
    const {
      title,
      category,
      jobType,
      jobLocationType,
      duration,
      experienceLevel,
      friendlyAddress,
      location,
      website,
      englishLevel,
      minPrice,
      maxPrice,
      description,
      skills,
    } = req.body;
  
    try {
      // Create a new JobPost instance
      const newJob = new JobPost({
        title,
        category,
        jobType,
        jobLocationType,
        duration,
        experienceLevel,
        friendlyAddress,
        location,
        website,
        englishLevel,
        minPrice,
        maxPrice,
        description,
        skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
        user: req.user.id,
      });
  
      // Handle file uploads
      if (req.files) {
        if (req.files.featuredImage) {
          newJob.featuredImage = `/uploads/job-images/${req.files.featuredImage[0].filename}`;
        }
        if (req.files.gallery) {
          newJob.gallery = req.files.gallery.map(file => `/uploads/job-images/${file.filename}`);
        }
      }
  
      // Save the new job post to the database
      await newJob.save();
      res.status(201).json(newJob);
    } catch (error) {
      console.error('Error creating job post:', error.message);
      res.status(500).json({ message: 'Error creating job post' });
    }
  };

// Get all job posts
const getJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find().populate('user', ['name', 'email']);
    res.json(jobPosts);
  } catch (error) {
    console.error('Error fetching job posts:', error);
    res.status(500).json({ message: 'Error fetching job posts' });
  }
};

// Get job post by ID
const getJobPostById = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id).populate('user', ['name', 'email']);
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.json(jobPost);
  } catch (error) {
    console.error('Error fetching job post:', error);
    res.status(500).json({ message: 'Error fetching job post' });
  }
};

// Update job post
const updateJobPost = async (req, res) => {
    const {
      title,
      category,
      jobType,
      jobLocationType,
      duration,
      experienceLevel,
      friendlyAddress,
      location,
      website,
      englishLevel,
      minPrice,
      maxPrice,
      description,
      skills,
    } = req.body;
  
    try {
      // Find the existing job post by ID
      const job = await JobPost.findById(req.params.id);
  
      if (!job) {
        return res.status(404).json({ message: 'Job post not found' });
      }
  
      // Update the job post fields
      job.title = title || job.title;
      job.category = category || job.category;
      job.jobType = jobType || job.jobType;
      job.jobLocationType = jobLocationType || job.jobLocationType;
      job.duration = duration || job.duration;
      job.experienceLevel = experienceLevel || job.experienceLevel;
      job.friendlyAddress = friendlyAddress || job.friendlyAddress;
      job.location = location || job.location;
      job.website = website || job.website;
      job.englishLevel = englishLevel || job.englishLevel;
      job.minPrice = minPrice || job.minPrice;
      job.maxPrice = maxPrice || job.maxPrice;
      job.description = description || job.description;
      job.skills = skills ? skills.split(',').map(skill => skill.trim()) : job.skills;
  
      // Handle file uploads
      if (req.files) {
        if (req.files.featuredImage) {
          job.featuredImage = `/uploads/job-images/${req.files.featuredImage[0].filename}`;
        }
        if (req.files.gallery) {
          job.gallery = req.files.gallery.map(file => `/uploads/job-images/${file.filename}`);
        }
      }
  
      // Save the updated job post
      const updatedJob = await job.save();
      res.status(200).json(updatedJob);
    } catch (error) {
      console.error('Error updating job post:', error.message);
      res.status(500).json({ message: 'Error updating job post' });
    }
  };

// Delete job post
const deleteJobPost = async (req, res) => {
  try {
    const deletedJobPost = await JobPost.findByIdAndDelete(req.params.id);
    if (!deletedJobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (error) {
    console.error('Error deleting job post:', error);
    res.status(500).json({ message: 'Error deleting job post' });
  }
};

module.exports = {
  createJobPost,
  getJobPosts,
  getJobPostById,
  updateJobPost,
  deleteJobPost,
  upload
};
