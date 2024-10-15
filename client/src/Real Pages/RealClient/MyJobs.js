import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Make sure axios is properly configured
import { FaEdit, FaTrashAlt, FaRegCalendarAlt, FaEye } from 'react-icons/fa'; // Import FaEye for the view icon
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MyJobs = () => {
  const [services, setServices] = useState([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobpost'); // Make sure the endpoint is correct
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Filter services by search term
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (jobId) => {
    if (!jobId) {
      console.error('Job ID is undefined');
      return;
    }

    try {
      await axios.delete(`/jobpost/${jobId}`); // Make sure the endpoint is correct
      // Update state to remove the deleted job
      setServices((prevServices) => prevServices.filter(service => service._id !== jobId));
      console.log('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="my-service p-4 lg:p-10">
      <h2 className="text-2xl font-semibold mb-4">My Jobs</h2>
      
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-1/4"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          
          {/* Add more sorting options if needed */}
        </select>
      </div>

      {/* Service Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4">Created Date</th>
              <th className="py-2 px-4">Duration</th>
              <th className="py-2 px-4">Job Type</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map(service => (
              <tr key={service._id} className="border-b">
                <td className="py-2 px-4">
                  <div className="flex flex-col">
                    <span>{service.title}</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaRegCalendarAlt className="mr-2" />
                      <span>{service.category}</span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 text-gray-600">{new Date(service.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4"> {service.duration}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-blue-800 `}>
                    {service.jobType}
                  </span>
                </td>
                <td className="py-2 px-4 rounded-full ">
                  <p className="text-green-500">
                    {service.location}
                  </p>
                </td>
                <td className="py-2 px-4 flex items-center">
                  <Link to={`/dashboardDash/client/job/${service._id}`} className="text-blue-500 mx-2">
                    <FaEye /> {/* View details icon */}
                  </Link>
                  <Link to={`/dashboardDash/client/editjob/${service._id}`}  className="text-yellow-500 mx-2">
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDelete(service._id)} className="text-red-500 mx-2">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyJobs;

