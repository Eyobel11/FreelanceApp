import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaStar, FaEnvelope, FaBriefcase, FaUsers, FaCalendarAlt, FaPhone } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';

const ViewClientProfile = () => {
  const { userId: paramUserId } = useParams();
  const reduxUserId = useSelector((state) => state.auth.userId);
  const userId = paramUserId || reduxUserId;
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);  // Add state for jobs

  useEffect(() => {
    const fetchProfileAndJobs = async () => {
      try {
        const profileResponse = await axios.get(`/clientprofile/${userId}`);
        setProfile(profileResponse.data);

        const jobsResponse = await axios.get(`/job/client/${userId}`);  // Fetch client jobs
        setJobs(jobsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userId) {
      fetchProfileAndJobs();
    }
  }, [userId]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Section */}
      <div className="image-add bg-center bg-cover text-black py-10 px-6 lg:flex lg:items-center lg:justify-between">
        {/* Profile Info */}
        <div className="lg:flex lg:items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Freelancer"
            className="w-32 h-32 lg:w-48 lg:h-48 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold">{profile.fullName}</h1>
            <p className="text-lg mt-2">Nursing Assistant</p>
            <div className="flex items-center space-x-6 mt-4">
              <span className="flex items-center">
                <FaEnvelope className="mr-2 text-gray-600" />
                {profile.email}
              </span>
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                Location: {profile.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10 p-4 lg:p-10 lg:flex lg:space-x-8">
        {/* Posted Services Section */}
        <div className="lg:w-2/3 space-y-8">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Posted Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map(job => (
                <div key={job._id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                  <img 
                    src={job.featuredImage || 'https://via.placeholder.com/150'}  // Placeholder if no image
                    alt="Service Image"
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <div className="text-gray-500 text-sm">{job.category}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex items-center mt-2 mb-4">
                    <FaStar className="text-yellow-400" />
                    <span className="ml-1 text-gray-700 font-bold">{job.rating || 'N/A'}</span>
                    <span className="ml-2 text-gray-500">({job.reviewCount || 0} Reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">{profile.fullName}</div>
                    <div className="text-gray-900 font-bold">Starting at: ${job.minPrice}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClientProfile;
