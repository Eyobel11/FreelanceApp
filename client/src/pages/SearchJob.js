// src/pages/SearchJob.js
import React, { useState, useEffect } from 'react';

const SearchJob = ({ jobs, setFilteredJobs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minBudget: '',
    maxBudget: '',
    deadline: ''
  });

  useEffect(() => {
    let updatedJobs = jobs;

    // Search by job title, description, or category
    if (searchTerm) {
      updatedJobs = updatedJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      updatedJobs = updatedJobs.filter((job) => job.category === filters.category);
    }

    // Apply budget filters
    if (filters.minBudget) {
      updatedJobs = updatedJobs.filter((job) => job.budget >= parseFloat(filters.minBudget));
    }
    if (filters.maxBudget) {
      updatedJobs = updatedJobs.filter((job) => job.budget <= parseFloat(filters.maxBudget));
    }

    // Apply deadline filter
    if (filters.deadline) {
      updatedJobs = updatedJobs.filter(
        (job) => new Date(job.deadline) <= new Date(filters.deadline)
      );
    }

    setFilteredJobs(updatedJobs);
  }, [searchTerm, filters, jobs, setFilteredJobs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input w-full border-gray-300 rounded-md p-3 mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="category"
          placeholder="Filter by category"
          value={filters.category}
          onChange={handleInputChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <input
          type="number"
          name="minBudget"
          placeholder="Min Budget"
          value={filters.minBudget}
          onChange={handleInputChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <input
          type="number"
          name="maxBudget"
          placeholder="Max Budget"
          value={filters.maxBudget}
          onChange={handleInputChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <input
          type="date"
          name="deadline"
          value={filters.deadline}
          onChange={handleInputChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
      </div>
    </div>
  );
};

export default SearchJob;
