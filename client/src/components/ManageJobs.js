// components/ManageJobs.js
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('/freelancers/jobs');
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs applied to yet.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Job Title</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Current Bid</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="py-2 px-4 border">{job.title}</td>
                <td className="py-2 px-4 border">{job.status}</td>
                <td className="py-2 px-4 border">{job.currentBid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageJobs;
