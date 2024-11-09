import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaStar, FaEnvelope, FaPhone, FaUserCircle, FaBriefcase, FaCalendarAlt, FaLanguage, FaTransgender } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'; // To get userId from URL
import { useSelector } from 'react-redux'; // To get userId from Redux
import axios from '../utils/axios';

const ViewProfilePageReal = () => {
  const { userId: paramUserId } = useParams(); // Get userId from route params
  const reduxUserId = useSelector((state) => state.auth.userId); // Get userId from Redux
  const userId = paramUserId || reduxUserId; // Use paramUserId if it exists, else use reduxUserId
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);  // Add state for jobs

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/freelancerprofile/${userId}`);
        setProfile(response.data);
        const jobsResponse = await axios.get(`/servicepost/freelancer/${userId}`);  // Fetch client jobs
        setJobs(jobsResponse.data);
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
    <div className="min-h-screen bg-gray-100">

      {/* Header Section */}
      <div className="image-add bg-center bg-cover text-black py-10 px-6 lg:flex lg:items-center lg:justify-between">
        <div className="lg:flex lg:items-center">
          <img
            src={profile.profileImage || "https://via.placeholder.com/150"}
            alt="Freelancer"
            className="w-32 h-32 lg:w-48 lg:h-48 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold">{profile.fullName}</h1>
            <p className="text-lg mt-2">{profile.jobTitle}</p>
            <div className="flex items-center space-x-6 mt-4">
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-600" />
                DOB: {new Date(profile.dob).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                Location: {profile.location}
              </span>
              <span className="px-3 py-1 rounded-full text-sm">
                ⭐ 4.9 (52 Reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 lg:mt-0">
          <button className="bg-orange-100 text-green-900 py-2 px-6 rounded-lg shadow-lg mr-4 border-2 border-green-900 hover:bg-orange-200">
            Hire Me
          </button>
          <button className="bg-green-800 text-white py-2 px-6 rounded-lg hover:bg-green-900">
            Contact Me
          </button>
        </div>
      </div>

      <div className="container mx-auto mt-10 p-4 lg:p-10 lg:flex lg:space-x-8">
        
        {/* Left Column: Freelancer Information */}
        <div className="lg:w-2/3 space-y-8">
          
          {/* About Me Section */}
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">About Me</h3>
            <p>{profile.description}</p>
          </div>

          {/* Education Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Education</h3>
            <ul className="list-disc ml-5">
              <li>{profile.educations}</li>
              <li>Master of Healthcare Management - ABC University, 2015</li>
            </ul>
          </div>

          {/* Work Experience Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Work Experience</h3>
            <ul className="list-disc ml-5">
              <li>{profile.works}</li>
              <li>Healthcare Consultant, Freelance, 2018-Present</li>
            </ul>
          </div>

          {/* Awards Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Awards</h3>
              <ul className="list-disc ml-5">
                <li>{profile.awards[0]}</li>
                <li>Outstanding Nursing Services Award, 2020</li>
              </ul>
            </div>

          {/* Posted Services Section */}
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Posted Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            {jobs.map(job => (

                  <Link to={`/freelancer/service/${job._id}`}  >
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
                    <div className="text-gray-900 font-bold">Starting at: ${job.servicePrice}</div>
                  </div>
                </div>

                </Link>
              ))}


              {/* Add more services here if needed */}
            </div>
          </div>

        </div>

        {/* Right Column: About the Seller and Skills */}
        <div className="lg:w-1/3 space-y-8">

          {/* About the Seller Widget */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaBriefcase className="text-gray-500 mr-2" />
                {profile.minRate} - {profile.maxRate} / hr
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                Location: {profile.location}
              </li>
              <li className="flex items-center">
                <FaUserCircle className="text-gray-500 mr-2" />
                Type: {profile.freelancerType}
              </li>
              <li className="flex items-center">
                <FaLanguage className="text-gray-500 mr-2" />
                English Level: {profile.englishLevel || 'Not specified'}
              </li>
              <li className="flex items-center">
                <FaTransgender className="text-gray-500 mr-2" />
                Gender: {profile.gender}
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-2" />
                Email: {profile.email}
              </li>
              <li className="flex items-center">
                <FaPhone className="text-gray-500 mr-2" />
                Phone Number: {profile.phone}
              </li>
            </ul>
          </div>

          {/* Skills Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap">
              {profile.skills ? profile.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 text-sm text-gray-600 px-4 py-2 mr-4 mb-4 rounded-lg">
                  {skill}
                </span>
              )) : <p>No skills listed</p>}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewProfilePageReal;
