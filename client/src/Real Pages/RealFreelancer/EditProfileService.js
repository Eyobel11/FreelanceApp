import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../utils/axios'; // Import Axios for API calls
import { useParams, useNavigate } from 'react-router-dom'; // For route navigation

const EditServicePost = () => {
  const { serviceId } = useParams(); // Get serviceId from the route params
  const navigate = useNavigate(); // Initialize useNavigate


  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [responseTime, setResponseTime] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [englishLevel, setEnglishLevel] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Fetch the existing service data
  useEffect(() => {
    const fetchService = async () => {
      if (!serviceId) return;

      try {
        const response = await axios.get(`/servicepost/${serviceId}`);
        const service = response.data;
        setFullName(service.fullName)
        setLocation(service.location)
        setTitle(service.title);
        setCategory(service.category);
        setDeliveryTime(service.deliveryTime);
        setResponseTime(service.responseTime);
        setServicePrice(service.servicePrice);
        setEnglishLevel(service.englishLevel);
        setDescription(service.description);
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  // Handle featured image upload
  const handleFeaturedImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  // Handle gallery image upload
  const handleGalleryChange = (e) => {
    setGallery([...e.target.files]);
  };

  // Handle form submission for updating the service post
  const handleUpdateService = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('deliveryTime', deliveryTime);
    formData.append('responseTime', responseTime);
    formData.append('servicePrice', servicePrice);
    formData.append('englishLevel', englishLevel);
    formData.append('description', description);
    formData.append('fullName', fullName);
    formData.append('location', location);

    // Append files if they exist
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    if (gallery.length > 0) {
      for (const file of gallery) {
        formData.append('gallery', file);
      }
    }

    try {
      await axios.put(`/servicepost/${serviceId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Service updated successfully');
      navigate('/freelancer/myservice'); // Redirect to My Services after updating
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Service</h2>
      
      {/* General Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {/* <h2 className="text-xl font-semibold mb-4">Service Information</h2> */}

                {/* Profile Image */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Profile Image</label>
        <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="block w-full" />
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <div>
            <label className="block mb-2 font-medium">FullName</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Categories</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Category</option>
              <option value="programming-tech">Programming & Tech</option>
              <option value="graphic-design">Graphic Design</option>
              <option value="content-writing">Writing & Translation</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="business">Business</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="music-audio">Music & Audio</option>
              <option value="video-animation">Video & Animation</option>
              <option value="development-it">Development & IT</option>
              <option value="finance-accounting">Finance & Accounting</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Delivery Time</label>
            <input
              type="text"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="e.g. 7 Days"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Response Time</label>
            <select
              value={responseTime}
              onChange={(e) => setResponseTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Response Time</option>
              <option>1 Hour</option>
              <option>2 Hours</option>
              <option>3 Hours</option>
              <option>4 Hours</option>
              <option>5 Hours</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Service Price</label>
            <input
              type="number"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="e.g. $100"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">English Level</label>
            <select
              value={englishLevel}
              onChange={(e) => setEnglishLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select English Level</option>
              <option value="fluent">Fluent</option>
              <option value="intermediate">Intermediate</option>
              <option value="basic">Basic</option>
            </select>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Description</label>
          <Editor
            apiKey='65gcyx9y0yezfpmk2p7xn336dpzjwn2walh2cekmrxk5o9k7'
            value={description}
            init={{
              height: 300,
              menubar: false,
              plugins: 'lists link image code',
              toolbar:
                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </div>
      
      {/* Media Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Media</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block mb-2 font-medium">Featured Image</label>
            <input type="file" onChange={handleFeaturedImageChange} className="block w-full" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Gallery</label>
            <input type="file" multiple onChange={handleGalleryChange} className="block w-full" />
          </div>
        </div>
      </div>

      <button
        onClick={handleUpdateService}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        Update Service
      </button>
    </div>
  );
};

export default EditServicePost;
