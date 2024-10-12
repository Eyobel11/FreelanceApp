import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaRegCalendarAlt } from 'react-icons/fa';

const MyService = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "I'll create an eCommerce Website for You",
      category: "Design & Creative",
      created: "October 18, 2023",
      expired: "November 17, 2023",
      cost: "$350.00",
      duration: "7 Days",
      status: "Published",
      queue: 2,
    },
    // More services can go here
  ]);

  const [sortBy, setSortBy] = useState('Newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter services by search term
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <th className="py-2 px-4">Expired</th>
              <th className="py-2 px-4">Cost/Type</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">In Queue</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map(service => (
              <tr key={service.id} className="border-b">
                <td className="py-2 px-4">
                  <div className="flex flex-col">
                    <span>{service.title}</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaRegCalendarAlt className="mr-2" />
                      <span>{service.category}</span>
                      <span className="ml-2">{service.created}</span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 text-red-500">{service.expired}</td>
                <td className="py-2 px-4">{service.cost} <br /> {service.duration}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded ${service.status === 'Published' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                    {service.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button className="bg-green-500 text-white px-4 py-1 rounded-full">
                    View in Queue ({service.queue})
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button className="text-yellow-500 mx-2">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 mx-2">
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
