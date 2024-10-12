import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get userId from URL
import { useSelector } from 'react-redux';  // To get userId from Redux
import axios from '../utils/axios';

const ViewProfilePage = () => {
  const { userId: paramUserId } = useParams();  // Get userId from route params
  const reduxUserId = useSelector((state) => state.auth.userId);  // Get userId from Redux
  const userId = paramUserId || reduxUserId;  // Use paramUserId if it exists, else use reduxUserId
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/profile/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>{profile.user.name}'s Profile</h2>
      <img src={profile.profilePicture} alt="Profile" />
      <p>Bio: {profile.bio}</p>
      <p>Skills: {profile.skills.join(', ')}</p>
      <p>Email: {profile.contact.email}</p>
      <p>Phone: {profile.contact.phone}</p>
      <p>LinkedIn: {profile.socialLinks.linkedin}</p>
      <p>GitHub: {profile.socialLinks.github}</p>
      <p>Website: {profile.socialLinks.website}</p>
    </div>
  );
};

export default ViewProfilePage;
