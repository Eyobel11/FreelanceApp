import React, { useState } from "react";
import { FaMapMarkerAlt, FaClock, FaGlobe, FaStar, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from "../Real DashBoard/Navbar";
import Footer from "../Real DashBoard/Footer";

const ServiceShow = () => {
  const images = [
    "https://via.placeholder.com/600x400", 
    "https://via.placeholder.com/600x400", 
    "https://via.placeholder.com/600x400"
  ];
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-16">
        {/* Header Section */}
        <div className="p-6 bg-orange-100">
          <h1 className="text-3xl font-bold">I will design website UI UX in Adobe XD or Figma</h1>
          <div className="flex items-center lg:space-x-6  sm:space-x-1 mt-4">
            <span className="flex items-center">
              <FaClock className="mr-2 text-gray-600" />
              Delivery Time: 4 Days
            </span>
            <span className="flex items-center">
              <FaGlobe className="mr-2 text-gray-600" />
              English Level: Conversational
            </span>
            <span className="flex items-center ">
              <FaMapMarkerAlt className="mr-2 text-gray-600 " />
              Location: Los Angeles
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Image Carousel */}
          <div className="lg:col-span-2 relative">
            <img src={images[current]} alt="Gig Work" className="w-full h-auto object-cover rounded-lg" />
            <button onClick={prevImage} className="absolute top-1/2 left-0 bg-gray-200 p-2 transform -translate-y-1/2">
              <FaChevronLeft />
            </button>
            <button onClick={nextImage} className="absolute top-1/2 right-0 bg-gray-200 p-2 transform -translate-y-1/2">
              <FaChevronRight />
            </button>
            <div className="flex mt-4 space-x-2 justify-center">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`w-20 h-16 object-cover cursor-pointer rounded-lg ${current === idx ? 'border-2 border-green-500' : 'border'}`}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </div>
          </div>

          {/* About the Seller Widget */}
          <div className="bg-white p-4 rounded-lg shadow-lg h-auto lg:h-1/2">
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-6xl text-gray-600" />
              <div className="ml-4">
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-sm text-gray-500">Freelancer</p>
                <p className="text-gray-600 mt-1">4.8 <FaStar className="inline text-yellow-500" /> (32 Reviews)</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              I am a UI/UX designer with over 5 years of experience in creating designs that meet client needs. Contact me for customized services.
            </p>
            <button className="bg-green-900 text-white py-2 px-4 rounded-lg w-full  hover:bg-green-950">Contact Me</button>
          </div>
        </div>

        {/* Service Description Section */}
        <div className="mt-6 p-4">
          <h3 className="text-xl font-bold">Service Description</h3>
          <p className="text-gray-700 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus at libero
            vehicula, et luctus felis blandit. Vivamus vehicula sodales est, eu rhoncus urna semper eu.
          </p>
        </div>

        {/* Reviews Section */}
        <div className="mt-6 p-4 sm:w-full md:w-full lg:w-2/3">
          <h3 className="text-xl font-bold mb-4">3 Reviews</h3>
          <div className="space-y-4">
            {/* Review 1 */}
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="font-semibold">Admin</p>
              <p className="text-yellow-500">⭐⭐⭐⭐☆</p>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur.</p>
            </div>

            {/* Review 2 */}
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="font-semibold">Ali Tufan</p>
              <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-600 ">Vivamus vehicula sodales est, eu rhoncus urna semper eu.</p>
            </div>
          </div>

          {/* Add a Review Form */}
          <div className="mt-6 p-4 ">
            <h4 className="font-bold mb-4">Add a Review</h4>
            <form className="space-y-6">
              {/* Textarea for Review */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                <textarea 
                  placeholder="Write your review..." 
                  rows="4" 
                  className="border p-3 w-full h-52 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                ></textarea>
              </div>
              
              {/* Name and Email side by side */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" 
                  />
                </div>
              </div>

              {/* Rating Section */}
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 mb-1 mr-4">Your Rating for this Listing</label>
                <div className="flex space-x-2">
                  {/* Stars for rating */}
                  <span className="text-yellow-500">★</span>
                  <span className="text-yellow-500">★</span>
                  <span className="text-yellow-500">★</span>
                  <span className="text-yellow-500">★</span>
                  <span className="text-gray-300">★</span>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="bg-green-900 text-white py-2 px-6 rounded-lg hover:bg-green-950 transition duration-200"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceShow;
