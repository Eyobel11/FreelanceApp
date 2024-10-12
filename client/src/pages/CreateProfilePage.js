import React, { useState } from 'react';
import axios from '../utils/axios';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const CreateProfilePage = () => {
  const [profileData, setProfileData] = useState({
    bio: '',
    skills: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    profilePicture: null, // Add profile picture to the state
  });

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, profilePicture: e.target.files[0] });
  };

  // Get user ID from Redux
  const userId = useSelector((state) => state.auth.user?._id);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create form data to handle the file upload along with other fields
    const formData = new FormData();
    formData.append('profilePicture', profileData.profilePicture); // Attach the file
    formData.append('bio', profileData.bio);
    formData.append('skills', profileData.skills);
    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone);
    formData.append('linkedin', profileData.linkedin);
    formData.append('github', profileData.github);
    formData.append('website', profileData.website);
    formData.append('userId', userId); 

    if (!userId) {
      console.error('User ID is required');
      return;
    }
    

    try {
      const response = await axios.post('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile created:', response.data);
    } catch (error) {
      console.error('Error creating profile:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={profileData.bio}
          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          placeholder="Write your bio"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          value={profileData.skills}
          onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
          placeholder="Skills (comma-separated)"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          value={profileData.phone}
          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
          placeholder="Phone"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          value={profileData.linkedin}
          onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
          placeholder="LinkedIn"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          value={profileData.github}
          onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
          placeholder="GitHub"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          value={profileData.website}
          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
          placeholder="Personal Website"
          className="w-full p-2 border rounded-md"
        />
        {/* File input for the profile picture */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="w-full p-2 border rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfilePage;
