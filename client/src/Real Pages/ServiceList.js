import React from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../Real DashBoard/Navbar";
import Footer from "../Real DashBoard/Footer";

const services = [
  {
    id: 1,
    name: "John Doe",
    serviceTitle: "Website UI UX Design",
    category: "Design & Creative",
    rating: 4.8,
    reviews: 32,
    price: "$120",
    location: "New York",
    thumbnail: "https://via.placeholder.com/600x400", // Replace with actual service image
    profileImage: "https://via.placeholder.com/40", // Replace with actual profile image
  },
  {
    id: 2,
    name: "Jane Smith",
    serviceTitle: "Mobile App Development",
    category: "Development & IT",
    rating: 4.6,
    reviews: 21,
    price: "$200",
    location: "Los Angeles",
    thumbnail: "https://via.placeholder.com/600x400", // Replace with actual service image
    profileImage: "https://via.placeholder.com/40", // Replace with actual profile image
  },
  {
    id: 3,
    name: "Ali Tufan",
    serviceTitle: "SEO Optimization",
    category: "Marketing",
    rating: 4.7,
    reviews: 18,
    price: "$90",
    location: "Miami",
    thumbnail: "https://via.placeholder.com/600x400", // Replace with actual service image
    profileImage: "https://via.placeholder.com/40", // Replace with actual profile image
  },
];

const ServiceList = () => {
  return (
    <> 
    <Navbar />
   
    <div className="min-h-screen bg-gray-100 mt-16">
      {/* Header */}
      <div className="bg-orange-100 text-black py-6 px-4 lg:py-10 lg:px-6 flex flex-col lg:flex-row items-center justify-between">
        <div className="mb-4 lg:mb-0 px-10">
          <h1 className="text-2xl lg:text-3xl font-bold py-2 ">Service List</h1>
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
          <h3 className="font-bold mb-4">Categories</h3>
          <div className="grid grid-cols-1 gap-2">
            <label><input type="checkbox" /> Design & Creative</label>
            <label><input type="checkbox" /> Development & IT</label>
            <label><input type="checkbox" /> Digital Marketing</label>
            <label><input type="checkbox" /> Finance & Accounting</label>
            <label><input type="checkbox" /> Lifestyle</label>
            <label><input type="checkbox" /> Music & Audio</label>
            <label><input type="checkbox" /> Programming & Tech</label>
            <label><input type="checkbox" /> Trending</label>
            <label><input type="checkbox" /> Video & Animation</label>
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

          <h3 className="font-bold mt-8 mb-4">Response Time</h3>
          <select className="w-full p-2 border rounded-lg mb-4">
            <option>Any</option>
            <option>Within 24 Hours</option>
            <option>Within 3 Days</option>
            <option>Within 7 Days</option>
          </select>

          <h3 className="font-bold mt-8 mb-4">Delivery Time</h3>
          <select className="w-full p-2 border rounded-lg mb-4">
            <option>Any</option>
            <option>Up to 24 Hours</option>
            <option>Up to 3 Days</option>
            <option>Up to 7 Days</option>
          </select>

          <h3 className="font-bold mt-8 mb-4">Budget</h3>
          <input
            type="range"
            min="0"
            max="500"
            step="1"
            className="w-full mb-4"
          />
          <div className="text-gray-500">$0 - $500</div>

          <h3 className="font-bold mt-8 mb-4">English Level</h3>
          <select className="w-full p-2 border rounded-lg mb-4">
            <option>Any</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Fluent</option>
          </select>

          <button className="bg-green-900 hover:bg-green-950 text-white py-2 px-4 w-full mt-4">
            Find Services
          </button>
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
              key={service.id}
              className="bg-white p-6 mb-6 rounded-lg shadow-md flex flex-col lg:flex-row items-start"
            >
              <img
                src={service.thumbnail}
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
                <div className="flex items-center  mt-4">
                <img
                      src={service.profileImage}
                      alt={service.name}
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <p className="text-sm text-gray-500">by {service.name}</p>
                  
                </div>
                  <div className="  flex items-center justify-end ">
                  <p className="font-bold text-lg -mt-8 ">{service.price}</p>
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