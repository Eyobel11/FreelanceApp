import React from "react";
import homeimg from "../assets/78.png";
import {useNavigate} from "react-router-dom"

const HeroSection = () => {

  const navigate = useNavigate();

  const clickaway = () => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
    navigate(`/registerDash`);
  };

  return (
    <div className="relative min-h-screen lg:h-screen bg-cover bg-center back sm:pt-10" style={{ backgroundPosition: 'center', backgroundSize: 'cover', objectFit: 'cover' }}>
      {/* Ensure background doesn't overlap the navbar */}
      <div className="absolute inset-0  opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row  items-center justify-between pt-16 sm:pt-12"> {/* added padding */}
        
        {/* Left Section: Text */}
        <div className="lg:w-1/2 text-white fade-in-text">
          <h1 className="text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 leading-tight sm:leading-normal">
            Freelance
          </h1>
          <h1 className="text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 leading-tight sm:leading-normal">
            Services For Your
          </h1>
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 sm:mb-11 leading-tight sm:leading-normal">
            Business
          </h1>
          <p className="text-md sm:text-lg mb-6">
            Work with talented people at the most affordable price to get the most out of your time and cost.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button onClick = {clickaway} className="bg-orange-200 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-orange-100 transition-all duration-300 ease-in-out">
              Find Work
            </button>
            <button onClick = {clickaway} className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 hover:text-black  transition-all duration-300 ease-in-out">
              Find Talent
            </button>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="lg:w-2/3 mt-10 lg:mt-0">
          <img src={homeimg} alt="Hero" className="rounded-lg fade-in-image" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
