const FreelancerProfile = require('../models/FreelancerProfile');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads/profile-pictures' and 'uploads/resumes' directories exist
if (!fs.existsSync('uploads/profile-pictures')) {
  fs.mkdirSync('uploads/profile-pictures', { recursive: true });
}
if (!fs.existsSync('uploads/resumes')) {
  fs.mkdirSync('uploads/resumes', { recursive: true });
}

// Set up multer storage for profile pictures and resumes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = file.fieldname === 'resume' ? 'uploads/resumes' : 'uploads/profile-pictures';
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Create or update profile
const createOrUpdateFreelancerProfile = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    location,
    description,
    jobTitle,
    minRate,
    maxRate,
    gender,
    dob,
    freelancerType,
    category,
    friendlyAddress,
    videoUrl,
    skills,
    awards,
    faqs,
  } = req.body;

  try {
    // Find profile by user ID (assuming user is logged in and req.user.id is available)
    let profile = await FreelancerProfile.findOne({ user: req.user.id });

    if (profile) {
      // Update profile fields
      profile.fullName = fullName || profile.fullName;
      profile.email = email || profile.email;
      profile.phone = phone || profile.phone;
      profile.location = location || profile.location;
      profile.description = description || profile.description;
      profile.jobTitle = jobTitle || profile.jobTitle;
      profile.minRate = minRate || profile.minRate;
      profile.maxRate = maxRate || profile.maxRate;
      profile.gender = gender || profile.gender;
      profile.dob = dob || profile.dob;
      profile.freelancerType = freelancerType || profile.freelancerType;
      profile.category = category || profile.category;
      profile.friendlyAddress = friendlyAddress || profile.friendlyAddress;
      profile.videoUrl = videoUrl || profile.videoUrl;
      profile.skills = skills ? skills.split(',') : profile.skills;
      profile.awards = awards ? awards.split(',') : profile.awards;
      profile.faqs = faqs ? faqs.split(',') : profile.faqs;

      // If new files are uploaded, update the file paths
      if (req.files['profileImage']) {
        profile.profileImage = `/uploads/profile-pictures/${req.files['profileImage'][0].filename}`;
      }
      if (req.files['resume']) {
        profile.resume = `/uploads/resumes/${req.files['resume'][0].filename}`;
      }

      // Save updated profile
      await profile.save();
      return res.status(200).json(profile);
    } else {
      // Create a new profile if it doesn't exist
      const newProfile = new FreelancerProfile({
        user: req.user.id,
        fullName,
        email,
        phone,
        location,
        description,
        jobTitle,
        minRate,
        maxRate,
        gender,
        dob,
        freelancerType,
        category,
        friendlyAddress,
        videoUrl,
        skills: skills ? skills.split(',') : [],
        awards: awards ? awards.split(',') : [],
        faqs: faqs ? faqs.split(',') : [],
        profileImage: req.files['profileImage'] ? `/uploads/profile-pictures/${req.files['profileImage'][0].filename}` : '',
        resume: req.files['resume'] ? `/uploads/resumes/${req.files['resume'][0].filename}` : '',
      });

      await newProfile.save();
      return res.status(201).json(newProfile);
    }
  } catch (error) {
    console.error('Error creating or updating profile:', error.message);
    res.status(500).json({ message: 'Error creating or updating profile' });
  }
};

// Get profile by user ID
const getFreelancerProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOne({ user: req.params.id }).populate('user', ['fullName', 'email']);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// Update profile
const updateFreelancerProfile = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    location,
    description,
    jobTitle,
    minRate,
    maxRate,
    gender,
    dob,
    freelancerType,
    category,
    friendlyAddress,
    videoUrl,
    skills,
    awards,
    faqs,
  } = req.body;

  try {
    const updatedProfile = await FreelancerProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        fullName,
        email,
        phone,
        location,
        description,
        jobTitle,
        minRate,
        maxRate,
        gender,
        dob,
        freelancerType,
        category,
        friendlyAddress,
        videoUrl,
        skills: skills ? skills.split(',') : [],
        awards: awards ? awards.split(',') : [],
        faqs: faqs ? faqs.split(',') : [],
        profileImage: req.files['profileImage'] ? `/uploads/profile-pictures/${req.files['profileImage'][0].filename}` : undefined,
        resume: req.files['resume'] ? `/uploads/resumes/${req.files['resume'][0].filename}` : undefined,
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

module.exports = {
  createOrUpdateFreelancerProfile,
  getFreelancerProfile,
  updateFreelancerProfile,
  upload,
};
