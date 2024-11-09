import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import image from "../assets/real logo.jpg"

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-20 text-white back">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side: Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold">Sera</a>
              {/* <img src={image} /> */}
            </div>

            {/* Center: Menu Items (shown on larger screens) */}
            <div className="hidden md:flex space-x-4">
              <a href="/" className="hover:text-gray-300 hover:underline px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="#services" className="hover:text-gray-300 hover:underline px-3 py-2 text-base font-medium">
                Browse Services
              </a>
              <a href="#freelancers" className="hover:text-gray-300 hover:underline px-3 py-2 text-base font-medium">
                Freelancers
              </a>
              <a href="/" className="hover:text-gray-300 hover:underline px-3 py-2 text-base font-medium">
                Blog
              </a>
              <Link to="/contact" className="hover:text-gray-300 hover:underline px-3 py-2 text-base font-medium">
                Contact
              </Link>
            </div>

            {/* Right Side: Sign In & Join Buttons (shown on larger screens) */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to = "/loginDash" className="bg-transparent border-2 border-white hover:bg-gray-100 hover:text-black text-white px-8 py-2 rounded-3xl text-base font-medium transition duration-300">
                Sign In
              </Link>

              <Link to = "/registerDash" className="bg-orange-200 hover:bg-orange-100 text-gray-900 px-7 py-2 rounded-3xl text-base font-bold">
                Join
              </Link>
            </div>

            {/* Hamburger Icon for mobile view */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleDrawer} className="focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Drawer (for mobile view) */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-30 transform transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleDrawer} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Drawer Menu Items */}
        <ul className="mt-6 space-y-2 px-4">
          <li>
            <a href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded">
              Home
            </a>
          </li>
          <li>
            <a href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded">
              Browse Jobs
            </a>
          </li>
          <li>
            <a href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded">
              Users
            </a>
          </li>
          <li>
            <a href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded">
              Blog
            </a>
          </li>
          <li>
            <a href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded">
              Contact
            </a>
          </li>
        </ul>

        {/* Login & Register Buttons */}
        <div className="mt-8 px-4">
          <Link to = "/loginDash" className="block w-full bg-transparent border-2 border-gray-700 hover:bg-gray-200 text-gray-700 px-8 py-2 rounded-lg text-base font-medium transition duration-300 mb-4">
            Login
          </Link>
          <Link to = "/registerDash" className="block w-full bg-orange-200 hover:bg-green-700 text-gray-900 px-8 py-2 rounded-lg text-base font-bold">
            Register
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
};

export default Navbar;
