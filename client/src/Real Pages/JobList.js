import React, { useState, useEffect } from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../Real DashBoard/Navbar";
import Footer from "../Real DashBoard/Footer";
import axios from '../utils/axios'; // Import axios for making API calls
import { useNavigate } from 'react-router-dom';



const JobListDash = () => {

  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const handleFreelancerClick = (jobId) => {
    navigate(`/jobdetail/${jobId}`);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/jobpost'); // Replace '/servicepost' with your actual API endpoint
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);
  return (
    <> 
    <Navbar />
   
    <div className="min-h-screen bg-gray-100 mt-16">
      {/* Header */}
      <div className="bg-orange-100 text-black py-6 px-4 lg:py-10 lg:px-6 flex flex-col lg:flex-row items-center justify-between">
        <div className="mb-4 lg:mb-0 px-10">
          <h1 className="text-2xl lg:text-3xl font-bold py-2 ">Job List</h1>
          <p className="text-sm lg:text-base py-2 px-4">
            Explore exciting job opportunities.
          </p>
        </div>
        <div className="relative w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search for jobs..."
            className="px-4 py-6 w-full lg:w-96 rounded-lg border focus:outline-none text-black"
          />
          <button className="bg-green-950 hover:bg-green-900 text-white px-6 py-2 rounded-lg absolute right-4 top-4">
            Search
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 lg:py-14 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Job Categories</h3>
          <div className="grid grid-cols-1 gap-2">
            <label><input type="checkbox" /> Design & Creative</label>
            <label><input type="checkbox" /> Development & IT</label>
            <label><input type="checkbox" /> Digital Marketing</label>
            <label><input type="checkbox" /> Finance & Accounting</label>
            <label><input type="checkbox" /> Human Resources</label>
            <label><input type="checkbox" /> Project Management</label>
            <label><input type="checkbox" /> Sales & Marketing</label>
            <label><input type="checkbox" /> Writing & Translation</label>
            <p className="text-green-900 mt-2 cursor-pointer hover:text-green-950">
              + Show More
            </p>
          </div>

          <h3 className="font-bold mt-8 mb-4">Date Posted</h3>
          <div className="grid grid-cols-1 gap-2">
            <label><input type="radio" name="date" /> Last Hour</label>
            <label><input type="radio" name="date" /> Last 24 Hours</label>
            <label><input type="radio" name="date" /> Last 7 Days</label>
            <label><input type="radio" name="date" /> Last 14 Days</label>
          </div>

          <h3 className="font-bold mt-8 mb-4">Experience Level</h3>
          <select className="w-full p-2 border rounded-lg mb-4">
            <option>Any</option>
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
          </select>

          <h3 className="font-bold mt-8 mb-4">Salary Range</h3>
          <input
            type="range"
            min="0"
            max="500"
            step="1"
            className="w-full mb-4"
          />
          <div className="text-gray-500">$0k - $500k</div>

          <h3 className="font-bold mt-8 mb-4">Job Type</h3>
          <select className="w-full p-2 border rounded-lg mb-4">
            <option>Any</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Freelance</option>
            <option>Contract</option>
          </select>

          <button className="bg-green-900 hover:bg-green-950 text-white py-2 px-4 w-full mt-4">
            Find Jobs
          </button>
        </div>

        {/* Job List */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <p className="mb-4 lg:mb-0">Showing all jobs</p>
            <select className="border p-2 rounded-lg">
              <option>Sort by Default</option>
              <option>Sort by Rating</option>
              <option>Sort by Salary</option>
            </select>
          </div>

          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 mb-6 rounded-lg shadow-md flex flex-col lg:flex-row items-start"
            >
              <img
                src={job.featuredImage}
                alt={job.title}
                className="w-full lg:w-1/3 h-40 rounded-lg object-cover mb-4 lg:mb-0 lg:mr-6"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{job.category}</p>
                <div className="flex items-center my-2">
                  <span className="flex items-center text-gray-500 mr-4">
                    {job.jobType}
                  </span>
                  <span className="text-sm text-gray-500">
                    {job.jobLocationType} 
                  </span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" />
                  <p className="text-gray-600">{job.location}</p>
                </div>
                <div className="flex items-center mt-4">
                  {/* <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  /> */}
                  <p className="text-sm text-gray-500">Posted {job.createdAt}</p>
                </div>
                <div className="flex items-center justify-end mt-4">
                  <p className="font-bold text-lg">${job.minPrice}-{job.maxPrice}</p>
                </div>
              </div>
              <button onClick={() => handleFreelancerClick(job._id)}  className="mt-4 lg:mt-0 lg:ml-6 bg-green-900 hover:bg-green-950 text-white px-4 py-2 rounded-lg">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default JobListDash;
