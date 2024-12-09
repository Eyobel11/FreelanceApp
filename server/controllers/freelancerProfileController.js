const FreelancerProfile = require('../models/FreelancerProfile');
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
    works,
    educations,
    faqs,
  } = req.body;

  try {
    // Find profile by user ID (assuming user is logged in and req.user.id is available)
    let profile = await FreelancerProfile.findOne({ user: req.user.id });


    const sanitizeList = (list) =>
      list ? list.split(',').map((item) => item.trim()).filter(Boolean) : [];
    
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
      profile.skills = sanitizeList(skills) || profile.skills;
      profile.awards = sanitizeList(awards) || profile.awards;
      profile.works = sanitizeList(works) || profile.works;
      profile.educations = sanitizeList(educations) || profile.educations;
      profile.faqs = sanitizeList(faqs) || profile.faqs;

      // If new files are uploaded, update the file paths
      if (req.files['profileImage']) {
        profile.profileImage = `/uploads/profile-pictures/${req.files['profileImage'][0].filename}`;
      }
      if (req.files['resume']) {
        profile.resume = `/uploads/resumes/${req.files['resume'][0].filename}`;
      }

      // Save updated profile
      await profile.save();

       // Create a notification for profile update
       const notification = new Notification({
         userId: req.user.id,
         type: 'Profile',
         message: `Your profile has been updated successfully.`,
         readStatus: false,
         link: `/freelancer/setprofile/${req.user.id}`
       });
       await notification.save();


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
        skills: sanitizeList(skills),
        awards: sanitizeList(awards),
        works: sanitizeList(works),
        educations: sanitizeList(educations),
        faqs: sanitizeList(faqs),
        profileImage: req.files['profileImage'] ? `/uploads/profile-pictures/${req.files['profileImage'][0].filename}` : '',
        resume: req.files['resume'] ? `/uploads/resumes/${req.files['resume'][0].filename}` : '',
      });

      await newProfile.save();

      // Create a notification for profile creation
      const notification = new Notification({
        userId: req.user.id,
        type: 'Profile',
        message: `Your profile has been created successfully.`,
        readStatus: false,
         link: `/freelancer/setprofile/${req.user.id}`
      });
      await notification.save();

      return res.status(201).json(newProfile);
    }
  } catch (error) {
    console.error('Error creating or updating profile:', error.message);
    res.status(500).json({ message: 'Error creating or updating profile' });
  }
};

const getAllFreeLancerProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.find().populate('user', ['name', 'email']);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
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

const getFreelancerProfileView = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findById(req.params.id).populate('user', ['fullName', 'email']);
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
    educations,
    works,
    awards,
    faqs,
  } = req.body;

  try {
    const sanitizeList = (list) =>
      list ? list.split(',').map((item) => item.trim()).filter(Boolean) : [];
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
        skills: sanitizeList(skills),
        awards: sanitizeList(awards),
        works: sanitizeList(works),
        educations: sanitizeList(educations),
        faqs: sanitizeList(faqs),
        profileImage: req.files['profileImage'] ? `/uploads/profile-pictures/${req.files['profileImage'][0].filename}` : undefined,
        resume: req.files['resume'] ? `/uploads/resumes/${req.files['resume'][0].filename}` : undefined,
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
  createOrUpdateFreelancerProfile,
  getFreelancerProfile,
  updateFreelancerProfile,
  getAllFreeLancerProfile,
  getFreelancerProfileView,
  upload,
};
