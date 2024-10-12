import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-8 px-6 md:px-12 lg:px-40 Footer-id">
      {/* Top Links Row */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-orange-200 pb-6 animate-fade-in">
        <div className="flex justify-center space-x-4 md:space-x-8">
          <a href="#" className="text-sm hover:underline">Terms of Service</a>
          <a href="#" className="text-sm hover:underline">Privacy Policy</a>
          <a href="#" className="text-sm hover:underline">Site Map</a>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        {/* About */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul>
            <li><a href="#" className="text-sm hover:underline">About Us</a></li>
            <li><a href="#" className="text-sm hover:underline">Become Seller</a></li>
            <li><a href="#" className="text-sm hover:underline">Jobs on Freeio</a></li>
            <li><a href="#" className="text-sm hover:underline">Pricing</a></li>
            <li><a href="#" className="text-sm hover:underline">Services Freeio</a></li>
            <li><a href="#" className="text-sm hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul>
            <li><a href="#" className="text-sm hover:underline">Design & Creative</a></li>
            <li><a href="#" className="text-sm hover:underline">Development & IT</a></li>
            <li><a href="#" className="text-sm hover:underline">Music & Audio</a></li>
            <li><a href="#" className="text-sm hover:underline">Programming & Tech</a></li>
            <li><a href="#" className="text-sm hover:underline">Digital Marketing</a></li>
            <li><a href="#" className="text-sm hover:underline">Finance & Accounting</a></li>
            <li><a href="#" className="text-sm hover:underline">Writing & Translation</a></li>
            <li><a href="#" className="text-sm hover:underline">Trending</a></li>
            <li><a href="#" className="text-sm hover:underline">Lifestyle</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul>
            <li><a href="#" className="text-sm hover:underline">Help & Support</a></li>
            <li><a href="#" className="text-sm hover:underline">FAQ Freeio</a></li>
            <li><a href="#" className="text-sm hover:underline">Contact Us</a></li>
            <li><a href="#" className="text-sm hover:underline">Services</a></li>
            <li><a href="#" className="text-sm hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-4">Stay updated with our latest updates and offers.</p>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaTwitter />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaInstagram />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaLinkedin />
            </a>
          </div>
          {/* <div>
            <h4 className="text-sm font-semibold">Apps</h4>
            <a href="#" className="block text-sm hover:underline mt-2">iOS App</a>
            <a href="#" className="block text-sm hover:underline mt-1">Android App</a>
          </div> */}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 border-t border-orange-200 pt-4 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">&copy; Freeio. 2022 CreativeLayers. All rights reserved.</p>
          <div className="relative inline-block text-left mt-4 md:mt-0">
            {/* <button className="text-sm flex items-center bg-gray-800 px-2 py-1 rounded hover:bg-gray-700">
              English <span className="ml-2">▼</span>
            </button> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
