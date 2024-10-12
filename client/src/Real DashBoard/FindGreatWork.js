import React from 'react';
import sampleImage from '../assets/findgreatwork.png';

const FindGreatWork = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-32">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
        
        {/* Left Section (Text) */}
        <div className="lg:w-1/2 w-full lg:pr-16 pr-0 text-center lg:text-left ml-12">
          <h4 className="text-green-500 font-medium mb-2 py-4 animate-fade-in">For clients</h4>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Find great work</h1>
          <p className="text-gray-700 mb-6 py-4 animate-fade-in">
            Work with the largest network of independent professionals and get things done— 
            from quick turnarounds to big transformations.
          </p>
          <button className="flex items-center px-6 py-3 border-2 border-black text-black font-medium rounded-full hover:bg-black hover:text-white transition-all animate-fade-in">
            Contact Us <span className="ml-2">→</span>
          </button>
        </div>

        {/* Right Section (Image) */}
        <div className="lg:w-1/2 w-full object-cover">
          <img 
            src={sampleImage} 
            alt="Woman working on a laptop" 
            className="rounded-lg  transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in"
          />
        </div>
      </div>
    </section>
  );
};

export default FindGreatWork;
