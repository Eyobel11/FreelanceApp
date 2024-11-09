import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditClientProfile = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const { user } = useSelector((state) => state.auth);  // Fetch user data from Redux

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    description: '',
    category: '',
    friendlyAddress: '',
    videoUrl: '',
    profileShow: 'show',
    website: '',
    foundedDate: '',
    employees: '',
    responseTime: '',
    profilePicture: null,
    gallery: null,
  });

  // Fetch profile data when component loads
  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        try {
          const { data } = await axios.get(`/clientprofile/${userId}`);
          setProfile({
            ...profile,
            ...data,
            profilePicture: null,
            gallery: null,
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      fetchProfile();
    }
  }, [userId]);

  // Handle editor content change
  const handleEditorChange = (content) => {
    setProfile({ ...profile, description: content });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.files[0] });
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle form submission
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      formData.append(key, profile[key]);
    });

    try {
      const response = await axios.put('/clientprofile/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile updated successfully:', response.data);
      navigate(`/client/setprofile/${user._id}`);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Image */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Profile Image</label>
          <input type="file" name="profilePicture" onChange={handleFileChange} className="block w-full" />
        </div>

        {/* Full Name, Email, Phone */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Response Time</label>
            <input
              type="text"
              name="responseTime"
              value={profile.responseTime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Show Profile, Category */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Show my Profile</label>
            <select
              name="profileShow"
              value={profile.profileShow}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="show">Show</option>
              <option value="hide">Hide</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Category</label>
            <select
              name="category"
              value={profile.category}
              onChange={handleChange}
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
              name="website"
              value={profile.website}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Founded Date</label>
            <input
              type="number"
              name="foundedDate"
              value={profile.foundedDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Employees</label>
            <input
              type="number"
              name="employees"
              value={profile.employees}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Friendly Address */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Friendly Address</label>
          <input
            type="text"
            name="friendlyAddress"
            value={profile.friendlyAddress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Description</label>
          <Editor
            apiKey='65gcyx9y0yezfpmk2p7xn336dpzjwn2walh2cekmrxk5o9k7'
            value={profile.description}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        {/* Media Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Gallery Image</label>
          <input type="file" name="gallery" onChange={handleFileChange} className="block w-full" />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Introduction Video URL</label>
          <input
            type="text"
            name="videoUrl"
            value={profile.videoUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditClientProfile;
