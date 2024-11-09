import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import pimg from '../assets/error.jpg'
import Navbar from '../Real DashBoard/Navbar';
import Footer from '../Real DashBoard/Footer';

const NotFound = () => {
  return (
    <>
    <Navbar />
    
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8 mt-24 mb-24">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src={pimg} // replace with actual image path
            alt="404 Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Right Side - 404 Message */}
        <div className="lg:w-1/2 w-full text-center lg:text-left mt-8 lg:mt-0 lg:ml-32">
          <h1 className="text-9xl font-extrabold text-gray-800">
            4<span className="text-green-500">0</span>4
          </h1>
          <p className="text-4xl font-semibold mt-4">Oops! It looks like you're lost.</p>
          <p className="mt-2 text-md text-gray-600">
            The page you're looking for isn't available. Try to search again or go to the home page.
          </p>

          {/* Button to navigate back to home */}
          <Link to="/" className="mt-6  inline-flex items-center px-6 py-4 bg-green-800 text-white font-medium rounded-lg hover:bg-green-950 transition-all">
            Back to Home <FaArrowRight className="ml-2 " />
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default NotFound;
