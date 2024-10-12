// src/pages/PostJob.js
import { useState } from 'react';
import API from '../utils/axios';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    deadline: '',
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/jobs', jobData);
      console.log('Job Posted Successfully:', res.data);
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          className="textarea w-full border-gray-300 rounded-md p-3"
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={jobData.budget}
          onChange={handleChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={jobData.category}
          onChange={handleChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <input
          type="date"
          name="deadline"
          value={jobData.deadline}
          onChange={handleChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <button type="submit" className="btn-primary w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
