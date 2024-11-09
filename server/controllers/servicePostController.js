const Service = require('../models/ServicePost'); // Import the Service model
const Notification = require('../models/Notification'); // Import Notification model

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads/service-images' directory exists
const uploadDir = 'uploads/service-images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage for service images
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

// Create a new service post
const createServicePost = async (req, res) => {
  const {
    fullName,
    location,
    title,
    category,
    deliveryTime,
    responseTime,
    servicePrice,
    englishLevel,
    description,
    skills,
  } = req.body;

  try {
    const newService = new Service({
      fullName,
      location,
      title,
      category,
      deliveryTime,
      responseTime,
      servicePrice,
      englishLevel,
      description,
      skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
      user: req.user.id, // Assuming authentication is used
    });

    if (req.files) {
      if (req.files.featuredImage) {
        newService.featuredImage = `/uploads/service-images/${req.files.featuredImage[0].filename}`;
      }
      if (req.files.gallery) {
        newService.gallery = req.files.gallery.map(file => `/uploads/service-images/${file.filename}`);
      }
    }

    await newService.save();

    // Create a notification for the service post creation
    const notification = new Notification({
      userId: req.user.id,
      type: 'Service',
      message: `Your service post "${title}" has been successfully created.`,
      readStatus: false,
      link: `/freelancer/myservice`
    });
    await notification.save();

    res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service post:', error.message);
    res.status(500).json({ message: 'Error creating service post' });
  }
};


// Get all service posts
const getServicePosts = async (req, res) => {
  try {
    const services = await Service.find().populate('user', ['name', 'email']);
    res.json(services);
  } catch (error) {
    console.error('Error fetching service posts:', error);
    res.status(500).json({ message: 'Error fetching service posts' });
  }
};

// Get service post by ID
const getServicePostById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('user', ['name', 'email']);
    if (!service) {
      return res.status(404).json({ message: 'Service post not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service post:', error);
    res.status(500).json({ message: 'Error fetching service post' });
  }
};

const getServicePostByIdView = async (req, res) => {
  try {
    // Populate 'user' field to retrieve the user's name, email, and _id
    const service = await Service.findById(req.params.id).populate('user', ['_id', 'name', 'email']);
    
    if (!service) {
      return res.status(404).json({ message: 'Service post not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service post:', error);
    res.status(500).json({ message: 'Error fetching service post' });
  }
};


// Update service post
const updateServicePost = async (req, res) => {
  const {
    fullName,
    location,
    title,
    category,
    deliveryTime,
    responseTime,
    servicePrice,
    englishLevel,
    description,
    skills,
  } = req.body;

  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service post not found' });
    }

    service.fullName = fullName || service.fullName;
    service.location = location || service.location;
    service.title = title || service.title;
    service.category = category || service.category;
    service.deliveryTime = deliveryTime || service.deliveryTime;
    service.responseTime = responseTime || service.responseTime;
    service.servicePrice = servicePrice || service.servicePrice;
    service.englishLevel = englishLevel || service.englishLevel;
    service.description = description || service.description;
    service.skills = skills ? skills.split(',').map(skill => skill.trim()) : service.skills;

    if (req.files) {
      if (req.files.featuredImage) {
        service.featuredImage = `/uploads/service-images/${req.files.featuredImage[0].filename}`;
      }
      if (req.files.gallery) {
        service.gallery = req.files.gallery.map(file => `/uploads/service-images/${file.filename}`);
      }
      if (req.files.profileImage) {
        service.profileImage = `/uploads/service-images/${req.files.profileImage[0].filename}`;
      }
    }

    const updatedService = await service.save();

    // Create a notification for the service post update
    const notification = new Notification({
      userId: req.user.id,
      type: 'Service',
      message: `Your service post "${title}" has been updated successfully.`,
      readStatus: false,
      link: `/freelancer/myservice`
    });
    await notification.save();

    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service post:', error.message);
    res.status(500).json({ message: 'Error updating service post' });
  }
};

// Delete service post
const deleteServicePost = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service post not found' });
    }

    // Create a notification for the service post deletion
    const notification = new Notification({
      userId: req.user.id,
      type: 'Service',
      message: `Your service post "${deletedService.title}" has been deleted.`,
      readStatus: false,
      link: `/freelancer/myservice`
    });
    await notification.save();

    res.status(200).json({ message: 'Service post deleted successfully' });
  } catch (error) {
    console.error('Error deleting service post:', error);
    res.status(500).json({ message: 'Error deleting service post' });
  }
};

// Get job posts by client ID
const getJobsByFreelancer = async (req, res) => {
  try {
    const services = await Service.find({ user: req.params.freelancerId });
    res.json(services);
  } catch (error) {
    console.error('Error fetching freelancer service:', error);
    res.status(500).json({ message: 'Error fetching freelancer service' });
  }
};

// Count all service posts
const countServicePosts = async (req, res) => {
  try {
    const serviceCount = await Service.countDocuments();
    res.status(200).json({ count: serviceCount });
  } catch (error) {
    console.error('Error counting service posts:', error.message);
    res.status(500).json({ message: 'Error counting service posts' });
  }
};


module.exports = {
  createServicePost,
  getServicePosts,
  getServicePostById,
  updateServicePost,
  deleteServicePost,
  getServicePostByIdView,
  getJobsByFreelancer,
  countServicePosts, // <-- New export for counting service posts
  upload,
};
