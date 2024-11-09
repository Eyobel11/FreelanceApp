const ClientProfile = require('../models/ClientProfile');
const Notification = require('../models/Notification'); // Import Notification model
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
    const {
      fullName,
      email,
      phone,
      location,
      description,
      category,
      friendlyAddress,
      videoUrl,
      profileShow,
      website,
      foundedDate,
      employees,
      responseTime
    } = req.body;
  
    try {
      // Find profile by user ID (assuming user is logged in and req.user.id is available)
      let profile = await ClientProfile.findOne({ user: req.user.id });
  
      if (profile) {
        // Update profile fields
        profile.fullName = fullName || profile.fullName;
        profile.email = email || profile.email;
        profile.phone = phone || profile.phone;
        profile.location = location || profile.location;
        profile.description = description || profile.description;
        profile.category = category || profile.category;
        profile.friendlyAddress = friendlyAddress || profile.friendlyAddress;
        profile.videoUrl = videoUrl || profile.videoUrl;
        profile.profileShow = profileShow || profile.profileShow;
        profile.website = website || profile.website;
        profile.foundedDate = foundedDate || profile.foundedDate;
        profile.employees = employees || profile.employees;
        profile.responseTime = responseTime || profile.responseTime;
  
        if (req.file) {
          // If a new profile image is uploaded, update it
          profile.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
          profile.gallery = `/uploads/profile-pictures/${req.file.filename}`;
        }
  
        // Save updated profile
        await profile.save();


        // Create a notification for profile update
       const notification = new Notification({
        userId: req.user.id,
        type: 'Profile',
        message: `Your profile has been updated successfully.`,
        readStatus: false,
        link: `/client/setprofile/${req.user.id}`
      });
      await notification.save();


        return res.status(200).json(profile);
      } else {
        // Create a new profile if it doesn't exist
        const newProfile = new ClientProfile({
          user: req.user.id,
          fullName,
          email,
          phone,
          location,
          description,
          category,
          friendlyAddress,
          videoUrl,
          profileShow,
          website,
          foundedDate,
          employees,
          responseTime,
          profilePicture: req.file ? `/uploads/profile-pictures/${req.file.filename}` : '',
          gallery: req.file ? `/uploads/profile-pictures/${req.file.filename}` : ''
        });
  
        await newProfile.save();

        // Create a notification for profile update
       const notification = new Notification({
        userId: req.user.id,
        type: 'Profile',
        message: `Your profile has been updated successfully.`,
        readStatus: false,
        link: `/client/setprofile/${req.user.id}`
      });
      await notification.save();


        return res.status(201).json(newProfile);
      }
    } catch (error) {
      console.error('Error creating or updating profile:', error.message);
      res.status(500).json({ message: 'Error creating or updating profile' });
    }
  };
  

// Get profile by user ID
const getProfile = async (req, res) => {
  try {
    const profile = await ClientProfile.findOne({ user: req.params.id }).populate('user', ['fullName', 'email']);
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
  const {
    fullName,
    email,
    phone,
    location,
    description,
    category,
    friendlyAddress,
    videoUrl,
    profileShow,
    website,
    foundedDate,
    employees,
    responseTime,
  } = req.body;

  try {
    const profilePicture = req.file ? `/uploads/profile-pictures/${req.file.filename}` : null;
    const gallery = req.file ? `/uploads/profile-pictures/${req.file.filename}` : null;

    const updatedProfile = await ClientProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        fullName,
        email,
        phone,
        location,
        description,
        category,
        friendlyAddress,
        videoUrl,
        profileShow,
        website,
        foundedDate,
        employees,
        responseTime,
        profilePicture: profilePicture || undefined,
        gallery: gallery || undefined,
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

        // Create a notification for profile update
        const notification = new Notification({
          userId: req.user.id,
          type: 'Profile',
          message: `Your profile has been updated successfully.`,
          readStatus: false,
          link: `/freelancer/${userId}`
        });
        await notification.save();
        

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
  upload,
};
