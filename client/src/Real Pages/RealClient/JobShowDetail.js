import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaBriefcase } from "react-icons/fa";
import axios from '../utils/axios'; // Make sure axios is properly configured
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const JobDetailDashClient = () => {
  const { jobId } = useParams(); // Get jobId from the route params
  const [job, setJob] = useState(null); // State for a single job

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;

      try {
        const response = await axios.get(`/jobpost/${jobId}`); // Fetch the job details using jobId
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!job) {
    return <div>Loading...</div>; // Display loading indicator while fetching the job
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        {/* Job Header */}
        <div className="image-add bg-cover bg-center py-10 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44 rounded-t-lg">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Left Side: Job Info */}
            <div className="flex items-center mb-6 lg:mb-0">
              <img
                src={job.companyLogo || "https://via.placeholder.com/100"} // Placeholder if no logo provided
                alt="Company Logo"
                className="w-20 h-20 rounded-full mr-6"
              />
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <p className="text-green-600">{job.category || "Unknown Company"}</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <p className="text-gray-500">
                    ${job.minPrice} - ${job.maxPrice} / {job.paymentType || "week"}
                  </p>
                  <p className="text-gray-500">{job.category}</p>
                  <p className="text-gray-500">{job.jobType}</p>
                </div>
              </div>
            </div>

            {/* Right Side: Apply Button */}
            <div className="text-right">
              <p className="text-gray-500 mb-2">Application ends:</p>
              <p className="font-bold mb-4">{new Date(job.expirationDate).toLocaleDateString()}</p>
              <button className="bg-green-900 hover:bg-green-950 text-white px-6 py-3 md:px-10 md:py-4 rounded-md">
                Apply Now
              </button>
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
                <p className="text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-500">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Offered Salary</p>
                <p className="text-gray-500">
                  ${job.minPrice} - ${job.maxPrice} 
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Experience</p>
                <p className="text-gray-500">{job.experienceLevel || "Not specified"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Expiration Date</p>
                <p className="text-gray-500">{new Date(job.expirationDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Industry</p>
                <p className="text-gray-500">{job.category || "Not specified"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Website</p>
                <p className="text-gray-500">{job.webiste || "Not specified"}</p>
              </div>
            </div>
           
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Job Description</h2>
            <p className="text-gray-600">
              {job.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailDashClient;
