const Profile = require('../models/Profile');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads/profile-pictures' directory exists
if (!fs.existsSync('uploads/profile-pictures')) {
  fs.mkdirSync('uploads/profile-pictures', { recursive: true });
}

// Set up multer storage for profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile-pictures');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Create or update profile
const createOrUpdateProfile = async (req, res) => {
  const { userId, bio, skills, email, phone, linkedin, github, website } = req.body;

  try {
    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      profile.bio = bio;
      profile.skills = skills.split(',').map(skill => skill.trim());
      profile.contact = { email, phone };
      profile.socialLinks = { linkedin, github, website };
      if (req.file) {
        profile.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
      }
      await profile.save();
      return res.json(profile);
    } else {
      profile = new Profile({
        user: userId,
        bio,
        skills: skills.split(',').map(skill => skill.trim()),
        contact: { email, phone },
        socialLinks: { linkedin, github, website },
        profilePicture: req.file ? `/uploads/profile-pictures/${req.file.filename}` : ''
      });
      await profile.save();
      return res.status(201).json(profile);
    }
  } catch (error) {
    console.error('Error creating or updating profile:', error);
    res.status(500).json({ message: 'Error creating or updating profile' });
  }
};

// Get profile by user ID
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate('user', ['name', 'email']);
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
const updateProfile = async (req, res) => {
  const { bio, skills, email, phone, linkedin, github, website } = req.body;
  try {
    const profilePicture = req.file ? `/uploads/profile-pictures/${req.file.filename}` : null;

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { 
        bio, 
        skills: skills.split(',').map(skill => skill.trim()), 
        contact: { email, phone }, 
        socialLinks: { linkedin, github, website }, 
        profilePicture 
      },
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

module.exports = {
  createOrUpdateProfile,
  getProfile,
  updateProfile,
  upload
};
