const ClientProfile = require('../models/ClientProfile');
const Notification = require('../models/Notification'); // Import Notification model
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
    const uploadDir = file.fieldname === 'gallery' ? 'uploads/resumes' : 'uploads/profile-pictures';
    cb(null, uploadDir);
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
  
      // Handle profile picture upload
      
      if (req.files['profilePicture']) {
        profile.profilePicture = `/uploads/profile-pictures/${req.files['profilePicture'][0].filename}`;
      }
      if (req.files['gallery']) {
        profile.gallery = `/uploads/resumes/${req.files['gallery'][0].filename}`;
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
          profilePicture: req.files['profilePicture'] ? `/uploads/profile-pictures/${req.files['profilePicture'][0].filename}` : '',
          gallery: req.files['gallery'] ? `/uploads/resumes/${req.files['resume'][0].filename}` : '',
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
        profilePicture: req.files['profilePicture'] ? `/uploads/profile-pictures/${req.files['profilePicture'][0].filename}` : undefined,
        gallery: req.files['gallery'] ? `/uploads/resumes/${req.files['resume'][0].filename}` : undefined,
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
