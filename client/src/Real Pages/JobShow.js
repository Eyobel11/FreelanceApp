import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaBriefcase } from "react-icons/fa";
import Navbar from "../Real DashBoard/Navbar";
import Footer from "../Real DashBoard/Footer";
import { Link, useParams } from 'react-router-dom'; // To get userId from URL
import axios from '../utils/axios';


const JobDetailDash = () => {

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
      <Navbar />
      <div className="min-h-screen bg-gray-50 mt-16">
        {/* Job Header */}
        <div className="bg-orange-50 py-10 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44 rounded-t-lg">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Left Side: Job Info */}
            <div className="flex items-center mb-6 lg:mb-0">
              <img
                src="https://via.placeholder.com/100"
                alt="Company Logo"
                className="w-20 h-20 rounded-full mr-6"
              />
              <div>
                <h1 className="text-2xl font-bold">{profile.title}</h1>
                <p className="text-green-600">{profile.category}</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <p className="text-gray-500">${profile.minPrice} - ${profile.maxPrice} / week</p>
                  <p className="text-gray-500">{profile.jobLocationType}</p>
                  <p className="text-gray-500">{profile.jobType}</p>
                </div>
              </div>
            </div>

            {/* Right Side: Apply Button */}
            <div className="text-right">
              <p className="text-gray-500 mb-2">Application ends:</p>
              <p className="font-bold mb-4">October 7, 2029</p>
              <Link to={`/submit-proposal/${jobId}`} className="bg-green-900 hover:bg-green-950 text-white px-6 py-3 md:px-10 md:py-4 rounded-md">
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* Job Overview Section */}
        <div className="container mx-auto py-8 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44">
          <h2 className="text-xl font-bold mb-4">Job Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Overview Items */}
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Date Posted</p>
                <p className="text-gray-500">{profile.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-500">{profile.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Offered Salary</p>
                <p className="text-gray-500">${profile.minPrice} - ${profile.maxPrice} / week</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Experience</p>
                <p className="text-gray-500">{profile.experienceLevel}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Expiration Date</p>
                <p className="text-gray-500">October 6, 2029</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Industry</p>
                <p className="text-gray-500">{profile.category}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">English</p>
                <p className="text-gray-500">{profile.englishLevel}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Website</p>
                <p className="text-gray-500">{profile.website}</p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Job Description</h2>
            <p className="text-gray-600">
            {profile.description}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetailDash;
