import React from 'react';
import { FaUsers, FaUserTie, FaShieldAlt } from 'react-icons/fa'; // Importing icons from react-icons
import sampleImage from '../assets/howitworksbg.png'; // Import your image

const HowItWorksSection = () => {
  const services = [
    {
      icon: <FaUsers size={40} className="text-green-900" />, // Post a job icon
      title: 'Post a job',
      description: 'It’s free and easy to post a job. Simply fill in a title, description.',
    },
    {
      icon: <FaUserTie size={40} className="text-green-900" />, // Choose freelancers icon
      title: 'Choose freelancers',
      description: 'It’s free and easy to post a job. Simply fill in a title, description.',
    },
    {
      icon: <FaShieldAlt size={40} className="text-green-900" />, // Pay safely icon
      title: 'Pay safely',
      description: 'It’s free and easy to post a job. Simply fill in a title, description.',
    },
  ];

  return (
    <section className="py-12 bg-orange-200 relative">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Need something done?</h2>
            <p className="text-gray-500 mb-12">Most viewed and all-time top-selling services</p>

            </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        
        {/* Left side - Cards */}
        <div className="space-y-6 relative z-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition duration-300 ${index === 2 ? 'lg:-mb-16' : ''}`} 
              style={index === 2 ? { position: 'relative', zIndex: 20 } : {}}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Right side - Image */}
        <div className="relative h-full pl-10">
          <img 
            src={sampleImage} 
            alt="Person working on laptop" 
            className=" object-contain w-full h-full" 
          />
        </div>

        {/* Card overlap styling */}
        {/* <div className="absolute right-0 top-1/2 transform translate-x-1/3 -translate-y-1/3 lg:hidden">
          {services[2].icon}
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorksSection;
