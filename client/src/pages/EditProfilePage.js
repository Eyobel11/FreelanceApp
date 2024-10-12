import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';  // To get the user ID from Redux store
import axios from '../utils/axios';

const EditProfilePage = () => {
  const userId = useSelector((state) => state.auth.userId);  // Fetch userId from Redux
  const [profileData, setProfileData] = useState({
    bio: '',
    skills: [],
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    profilePicture: null,  // Handle the file upload
  });
  
  useEffect(() => {
    // Fetch current profile data to populate form fields for editing
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/profile/${userId}`);
        setProfileData(response.data); // Populate form fields with profile data
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();  // For handling file upload
    formData.append('bio', profileData.bio);
    formData.append('skills', profileData.skills);
    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone);
    formData.append('linkedin', profileData.linkedin);
    formData.append('github', profileData.github);
    formData.append('website', profileData.website);
    if (profileData.profilePicture) {
      formData.append('profilePicture', profileData.profilePicture);
    }
    
    try {
      const response = await axios.put(`/profile/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
     
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, profilePicture: e.target.files[0] });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={profileData.bio} onChange={handleInputChange} />
        </div>
        <div>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={profileData.skills.join(', ')}
            onChange={(e) => setProfileData({ ...profileData, skills: e.target.value.split(',') })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={profileData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} />
        </div>
        <div>
          <label>LinkedIn:</label>
          <input type="url" name="linkedin" value={profileData.linkedin} onChange={handleInputChange} />
        </div>
        <div>
          <label>GitHub:</label>
          <input type="url" name="github" value={profileData.github} onChange={handleInputChange} />
        </div>
        <div>
          <label>Website:</label>
          <input type="url" name="website" value={profileData.website} onChange={handleInputChange} />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" name="profilePicture" onChange={handleFileChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;