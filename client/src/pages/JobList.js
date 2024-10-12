// src/pages/JobList.js
import { useEffect, useState } from 'react';
import API from '../utils/axios';
import SearchJob from './SearchJob'; // Import the SearchJob component

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs');
        setJobs(res.data);
        setFilteredJobs(res.data); // Initialize filtered jobs with all jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Jobs</h2>

      {/* Integrate SearchJob Component */}
      <SearchJob jobs={jobs} setFilteredJobs={setFilteredJobs} />

      {/* Display filtered jobs */}
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <div key={job._id} className="mb-6 p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <p className="text-gray-600"><span className="font-medium">Budget:</span> ${job.budget}</p>
            <p className="text-gray-600"><span className="font-medium">Category:</span> {job.category}</p>
            <p className="text-gray-600"><span className="font-medium">Deadline:</span> {new Date(job.deadline).toDateString()}</p>
            <a href={`/job/${job._id}`} className="mt-4 inline-block text-blue-500 hover:text-blue-600">View Details</a>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No jobs available based on your search criteria.</p>
      )}
    </div>
  );
};

export default JobList;
