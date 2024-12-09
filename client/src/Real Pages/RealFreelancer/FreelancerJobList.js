import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const FreelancerJobListDash = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    datePosted: '',
    experienceLevel: 'Any',
    salaryRange: 500,
    jobType: 'Any'
  });
  const navigate = useNavigate();

  const handleFreelancerClick = (jobId) => {
    navigate(`/freelancer/jobdetail/${jobId}`);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobpost');
        setJobs(response.data);
        setFilteredJobs(response.data); // Initial setting for display
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
    applyFilters();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter(job => filters.category.includes(job.category));
    }

    if (filters.experienceLevel !== 'Any') {
      filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    if (filters.jobType !== 'Any') {
      filtered = filtered.filter(job => job.jobType === filters.jobType);
    }

    filtered = filtered.filter(job => {
      const jobSalary = (job.minPrice + job.maxPrice) / 2;
      return jobSalary <= filters.salaryRange;
    });

    setFilteredJobs(filtered);
  };

  return (
    <> 
      <div className="min-h-screen bg-gray-50 ">
        {/* Header */}
        <div className=" image-add bg-cover bg-center text-black py-6 px-4 lg:py-10 lg:px-6 flex flex-col lg:flex-row items-center justify-between" 
          >
          <div className="mb-4 lg:mb-0 px-10">
            <h1 className="text-2xl lg:text-3xl font-semibold py-2 ">Job List</h1>
            <p className="text-sm lg:text-base py-2 px-4">
              Explore exciting job opportunities.
            </p>
          </div>
          <div className="relative w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search for jobs..."
              className="px-4 py-6 w-full lg:w-96 rounded-lg border focus:outline-none text-black"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch} className="bg-green-950 hover:bg-green-900 text-white px-6 py-2 rounded-lg absolute right-4 top-4">
              Search
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-10 lg:py-14 flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-4">Job Categories</h3>
            <div className="grid grid-cols-1 gap-2">
              {["Business", "Design", "Digital Marketing", "Lifestyle", "Programming & Tech", "Project Management", "Web Development", "Writing & Translation"].map(category => (
                <label key={category}>
                  <input 
                    type="checkbox" 
                    value={category} 
                    onChange={(e) => {
                      handleFilterChange('category', e.target.checked 
                        ? [...filters.category, category] 
                        : filters.category.filter(c => c !== category)
                      );
                    }} 
                  /> 
                  {category}
                </label>
              ))}
            </div>

            <h3 className="font-medium mt-8 mb-4">Experience Level</h3>
            <select className="w-full p-2 border rounded-lg mb-4" onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}>
              <option>Any</option>
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
            </select>

            <h3 className="font-medium mt-8 mb-4">Salary Range</h3>
            <input
              type="range"
              min="0"
              max="500"
              step="1"
              className="w-full mb-4"
              value={filters.salaryRange}
              onChange={(e) => handleFilterChange('salaryRange', Number(e.target.value))}
            />
            <div className="text-gray-500">$0k - ${filters.salaryRange}k</div>

            <h3 className="font-medium mt-8 mb-4">Job Type</h3>
            <select className="w-full p-2 border rounded-lg mb-4" onChange={(e) => handleFilterChange('jobType', e.target.value)}>
              <option>Any</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Freelance</option>
              <option>Contract</option>
            </select>

            <button onClick={applyFilters} className="bg-green-900 hover:bg-green-950 text-white py-2 px-4 w-full mt-4">
              Find Jobs
            </button>
          </div>

          {/* Job List */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
              <p className="mb-4 lg:mb-0">Showing {filteredJobs.length} jobs</p>
              <select className="border p-2 rounded-lg">
                <option>Sort by Default</option>
                <option>Sort by Rating</option>
                <option>Sort by Salary</option>
              </select>
            </div>

            {filteredJobs.map((job) => (
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
                  <h3 className="text-xl font-semibold">{job.title}</h3>
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
                    <p className="text-sm text-gray-500">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center justify-end mt-4">
                    <p className="font-medium text-lg">${job.minPrice}-{job.maxPrice}</p>
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
    </>
  );
};

export default FreelancerJobListDash;
