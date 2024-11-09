import React from 'react';
import sampleImage from '../assets/yourway.png';
import {useNavigate} from "react-router-dom"

const Hero = () => {

  const navigate = useNavigate();

  const clickaway = () => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
    navigate(`/registerDash`);
  };


  return (
    <section className="relative bg-white py-16 px-6 md:px-12 lg:px-32">
      <div className="container mx-auto flex flex-col-reverse md:flex-row-reverse items-center justify-between">
        
        {/* Right Section: Text */}
        <div className="md:w-1/2 w-full mb-10 md:mb-0 text-center md:text-left -mr-9">
          <p className="text-green-600 font-medium py-4 animate-fade-in">For clients</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 animate-fade-in">
            Find talent 
          </h1>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 animate-fade-in">
           your way
          </h1>
          <p className="text-gray-600 mb-8 py-4 md:w-2/3 animate-fade-in">
            Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
          </p>
          <button
            onClick={clickaway}
            className="inline-flex items-center justify-center px-6 py-3 border border-black text-black font-medium rounded-full hover:bg-black hover:text-white transition-all animate-fade-in"
          >
            Get Started <span className="ml-2">→</span>
          </button>
        </div>

        {/* Left Section: Image */}
        <div className="md:w-1/2 w-full">
          <div className="relative">
            <img
              src={sampleImage} // Replace this with your actual image path
              alt="Person working"
              className="rounded-xl transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
