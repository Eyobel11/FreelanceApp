import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../utils/axios'; // Make sure you have axios configured for API calls
import { useParams } from 'react-router-dom';  // To get userId from URL
import { useSelector } from 'react-redux';  // To get userId from Redux
import Swal from 'sweetalert2';


const ClientProfile = () => {


  // const { userId: paramUserId } = useParams();  // Get userId from route params
  const userId = useSelector((state) => state.auth.userId);  // Get userId from Redux
  // const userId = reduxUserId;  // Use paramUserId if it exists, else use reduxUserId


  const [description, setDescription] = useState('');
  const [profilePicture, setprofilePicture] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [friendlyAddress, setFriendlyAddress] = useState('');
  const [gallery, setGallery] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [profileShow, setProfileShow] = useState('show');
  const [website, setWebsite] = useState('');
  const [foundedDate, setFoundedDate] = useState('');
  const [employees, setEmployees] = useState('');
  const [responseTime, setResponseTime] = useState('');

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/clientprofile/${userId}`); // Endpoint to fetch the logged-in user's profile
        setFullName(data.fullName);
        setEmail(data.email);
        setPhone(data.phone);
        setLocation(data.location);
        setDescription(data.description);
        setCategory(data.category);
        setFriendlyAddress(data.friendlyAddress);
        setVideoUrl(data.videoUrl);
        setProfileShow(data.profileShow);
        setWebsite(data.website);
        setFoundedDate(data.foundedDate);
        setEmployees(data.employees);
        setResponseTime(data.responseTime);
        setprofilePicture(data.profilePicture);
        setGallery(data.gallery)
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
      if(userId){
        fetchProfile();
      }
    
  }, [userId]);

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture); // 'profilePicture' matches the backend schema
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('friendlyAddress', friendlyAddress);
    formData.append('gallery', gallery);
    formData.append('videoUrl', videoUrl);
    formData.append('profileShow', profileShow);
    formData.append('website', website);
    formData.append('foundedDate', foundedDate);
    formData.append('employees', employees);
    formData.append('responseTime', responseTime);

    try {
      const response = await axios.post('/clientprofile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire({
        title: 'Profile Saved!',
        text: 'Your profile has been saved successfully.',
        icon: 'success',
        confirmButtonColor: '#3E4B40',
      });

      console.log('Profile saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving profile:', error.response?.data || error.message);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error saving your profile. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
      
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>

      {/* Profile Image */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Profile Image</label>
        <input type="file" onChange={(e) => setprofilePicture(e.target.files[0])} className="block w-full" />
      </div>

      {/* Full Name, Email, Phone */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Response Time</label>
          <input
            type="text"
            value={responseTime}
            onChange={(e) => setResponseTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Show Profile, Category */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Show my Profile</label>
          <select
            value={profileShow}
            onChange={(e) => setProfileShow(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="show">Show</option>
            <option value="hide">Hide</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="business">Business</option>
            <option value="designer">Designer</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="programming-tech">Programming & Tech</option>
            <option value="project-managers">Project Managers</option>
            <option value="web-developers">Web Developers</option>
            <option value="writing-translation">Writing & Translation</option>
          </select>
        </div>
      </div>

      {/* Website, Founded Date, Employees, Location */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Website</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Founded Date</label>
          <input
            type="number"
            value={foundedDate}
            onChange={(e) => setFoundedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Employees</label>
          <input
            type="number"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Friendly Address */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Friendly Address</label>
        <input
          type="text"
          value={friendlyAddress}
          onChange={(e) => setFriendlyAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Description</label>
        <Editor
          apiKey='65gcyx9y0yezfpmk2p7xn336dpzjwn2walh2cekmrxk5o9k7'
          value={description}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      {/* Media Upload */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Gallery Image</label>
        <input type="file" onChange={(e) => setGallery(e.target.files[0])} className="block w-full" />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Introduction Video URL</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveProfile}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
      >
        Save Profile
      </button>
    </div>
  );
};

export default ClientProfile;
