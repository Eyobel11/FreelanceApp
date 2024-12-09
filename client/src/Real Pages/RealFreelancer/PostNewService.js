import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../utils/axios'; // Import Axios for API call
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'

function PostNewService() {

  const navigate = useNavigate()

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

  // Handle form submission
  const handleSubmit = async () => {
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

    // Append files
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    if (gallery.length > 0) {
      for (const file of gallery) {
        formData.append('gallery', file);
      }

    if (profileImage) {
        formData.append('profileImage', profileImage);
      }
    }

    try {
      const response = await axios.post('/servicepost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire({
        title: 'Service Posted!',
        text: 'Your service has been posted successfully.',
        icon: 'success',
        confirmButtonColor: '#3E4B40',
      });
      console.log('Service posted successfully:', response.data);
      
      navigate(`/freelancer/myservice`)
      // Optionally reset the form or display a success message
    } catch (error) {

      Swal.fire({
        title: 'Error!',
        text: 'There was an error posting your service. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });

      console.error('Error posting service:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* General Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Post a New Service</h2>
        {/* Profile Image */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Profile Image</label>
        <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="block w-full" />
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Service title..."
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Service title..."
            />
          </div>
          
          
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Service title..."
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
              <option>Programming & Tech</option>
              <option>Graphics & Design</option>
              <option>Writing & Translation</option>
              <option>Digital Marketing</option>
              <option>Business</option>
              <option>Lifestyle</option>
              <option>Music & Audio</option>
              <option>Video & Animation</option>
              <option>Development & IT</option>
              <option>Finance & Accounting</option>

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
              <option value="">Select Category</option>
              <option>1 Hour</option>
              <option>2 Hours</option>
              <option>3 Hours</option>
              <option>4 Hours</option>
              <option>5 Hours</option>
              <option>6 Hours</option>
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
              <option value="">Select Category</option>
              <option>Fluent</option>
              <option>Intermediate</option>
              <option>Basic</option>
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

      {/* Action Buttons */}
      <div className="flex">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          onClick={handleSubmit}
        >
          Submit & Preview
        </button>
      </div>
    </div>
  );
}

export default PostNewService;
