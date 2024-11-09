import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaBriefcase } from "react-icons/fa";

import { Link, useParams } from 'react-router-dom'; // To get userId from URL
import axios from '../utils/axios';


const FreelancerJobDetailDash = () => {

  const { userId: jobId } = useParams(); 
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/jobpost/${jobId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (jobId) {
      fetchProfile();
    }
  }, [jobId]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
     
      <div className="min-h-screen bg-gray-50 ">
        {/* Job Header */}
        <div className="image-add2 py-10 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44 rounded-t-lg">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Left Side: Job Info */}
            <div className="flex items-center mb-6 lg:mb-0">
              <img
                src="https://via.placeholder.com/100"
                alt="Company Logo"
                className="w-20 h-20 rounded-full mr-6"
              />
              <div>
                <h1 className="text-2xl font-semibold text-white">{profile.title}</h1>
                <p className="text-orange-50">{profile.category}</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <p className="text-orange-50">${profile.minPrice} - ${profile.maxPrice} / week</p>
                  <p className="text-orange-50">{profile.jobLocationType}</p>
                  <p className="text-orange-50">{profile.jobType}</p>
                </div>
              </div>
            </div>

            {/* Right Side: Apply Button */}
            <div className="text-right">
              <p className="text-orange-50 mb-2">Application ends:</p>
              <p className="font-semibold mb-4 text-white">October 7, 2029</p>
              <Link to={`/freelancer/submit-proposal/${jobId}`} className="bg-orange-200  hover:bg-orange-50 font-semibold text-black px-6 py-3 md:px-10 md:py-4 rounded-md">
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* Job Overview Section */}
        <div className="container mx-auto py-8 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44">
          <h2 className="text-xl font-medium mb-4">Job Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Overview Items */}
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-normal">Date Posted</p>
                <p className="text-gray-500">{profile.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-normal">Location</p>
                <p className="text-gray-500">{profile.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="text-green-900 mr-4" />
              <div>
                <p className="font-normal">Offered Salary</p>
                <p className="text-gray-500">${profile.minPrice} - ${profile.maxPrice} / week</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-normal">Experience</p>
                <p className="text-gray-500">{profile.experienceLevel}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-normal">Expiration Date</p>
                <p className="text-gray-500">October 6, 2029</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-normal">Industry</p>
                <p className="text-gray-500">{profile.category}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-normal">English</p>
                <p className="text-gray-500">{profile.englishLevel}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-normal">Website</p>
                <p className="text-gray-500">{profile.website}</p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-4">Job Description</h2>
            <p className="text-gray-600">
            {profile.description}
            </p>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default FreelancerJobDetailDash;
