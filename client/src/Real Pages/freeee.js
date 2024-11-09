import React, { useState, useEffect } from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../Real DashBoard/Navbar";
import Footer from "../Real DashBoard/Footer";
import axios from '../utils/axios'; // Import axios for making API calls

const ServiceList = () => {
  const [services, setServices] = useState([]);

  // Fetch services data from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/servicepost'); // Replace '/servicepost' with your actual API endpoint
        setServices(response.data);
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
            <h1 className="text-2xl lg:text-3xl font-bold py-2">Service List</h1>
            <p className="text-sm lg:text-base py-2 px-4">
              Find the best services tailored to your needs.
            </p>
          </div>
          <div className="relative w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search for services..."
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
            {/* Sidebar filter content */}
            <h3 className="font-bold mb-4">Categories</h3>
            {/* Categories, Date Posted, Response Time, etc. */}
            {/* Rest of the sidebar filter code */}
          </div>

          {/* Service List */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
              <p className="mb-4 lg:mb-0">Showing all services</p>
              <select className="border p-2 rounded-lg">
                <option>Sort by Default</option>
                <option>Sort by Rating</option>
                <option>Sort by Price</option>
              </select>
            </div>

            {services.map((service) => (
              <div
                key={service._id} // Use a unique key from the service data
                className="bg-white p-6 mb-6 rounded-lg shadow-md flex flex-col lg:flex-row items-start"
              >
                <img
                  src={service.thumbnail || "https://via.placeholder.com/600x400"}
                  alt={service.serviceTitle}
                  className="w-full lg:w-1/3 h-40 rounded-lg object-cover mb-4 lg:mb-0 lg:mr-6"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{service.serviceTitle}</h3>
                  <p className="text-sm text-gray-500 mb-2">{service.category}</p>
                  <div className="flex items-center my-2">
                    <span className="flex items-center text-yellow-500 mr-4">
                      <FaStar className="mr-1" /> {service.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({service.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-500 mr-2" />
                    <p className="text-gray-600">{service.location}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <img
                      src={service.profileImage || "https://via.placeholder.com/40"}
                      alt={service.name}
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <p className="text-sm text-gray-500">by {service.name}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className="font-bold text-lg -mt-8">{service.price}</p>
                  </div>
                </div>
                <button className="mt-4 lg:mt-0 lg:ml-6 bg-green-900 hover:bg-green-950 text-white px-4 py-2 rounded-lg">
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

export default ServiceList;
