import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaRegCalendarAlt, FaEye } from 'react-icons/fa'; // Import FaEye for the view icon
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from '../utils/axios'; // Make sure axios is properly configured

const MyService = () => {
  const [services, setServices] = useState([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/servicepost'); // Make sure the endpoint is correct
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Filter services by search term
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (serviceId) => {
    if (!serviceId) {
      console.error('Service ID is undefined');
      return;
    }

    try {
      await axios.delete(`/servicepost/${serviceId}`); // Make sure the endpoint is correct
      // Update state to remove the deleted service
      setServices((prevServices) => prevServices.filter(service => service._id !== serviceId));
      console.log('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="my-service p-4 lg:p-10">
      <h2 className="text-2xl font-semibold mb-4">My Services</h2>
      
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
          <option value="Cost">Cost</option>
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
              <th className="py-2 px-4">Cost/Type</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Delivery Time</th>
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
                      <span className="ml-2">{new Date(service.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 text-gray-600">{new Date(service.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4">{service.servicePrice} <br /> {service.duration}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-blue-600`}>
                    Published
                  </span>
                </td>
                <td className="py-2 px-4">
                  <p className=" text-green-500 px-4 py-1 rounded-full">
                   {service.deliveryTime}
                  </p>
                </td>
                <td className="py-2 px-4 flex items-center">
                  <Link to={`/dashboardDash/freelancer/service/${service._id}`} className="text-blue-500 mx-2">
                    <FaEye /> {/* View details icon */}
                  </Link>
                  <Link to={`/dashboardDash/freelancer/editservice/${service._id}`} className="text-yellow-500 mx-2">
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

export default MyService;
