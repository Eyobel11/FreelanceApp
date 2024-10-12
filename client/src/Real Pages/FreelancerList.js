import React from "react";
import Navbar from "../Real DashBoard/Navbar";
import Footer from "../Real DashBoard/Footer";

const freelancers = [
  {
    id: 1,
    name: "Agent Pakula",
    role: "Nursing Assistant",
    rating: 4.0,
    location: "New York",
    rate: "$80 - $95 / hr",
    skills: ["Design Writing", "HTML5", "Prototyping"],
    profileImage: "/images/freelancer1.png"
  },
  {
    id: 2,
    name: "John Powell",
    role: "Product Manager",
    rating: 3.9,
    location: "Los Angeles",
    rate: "$55 - $80 / hr",
    skills: ["Animation", "Creative", "Figma"],
    profileImage: "/images/freelancer2.png"
  },
  {
    id: 3,
    name: "Thomas Powell",
    role: "Design & Creative",
    rating: 4.0,
    location: "Los Angeles",
    rate: "$25 - $50 / hr",
    skills: ["Creative", "Figma", "Prototyping"],
    profileImage: "/images/freelancer3.png"
  },
  {
    id: 4,
    name: "Tom Wilson",
    role: "Web Developer",
    rating: 3.9,
    location: "New York",
    rate: "$45 - $50 / hr",
    skills: ["JavaScript", "React", "TailwindCSS"],
    profileImage: "/images/freelancer4.png"
  }
];

const FreelancerList = () => {
  return (
    <>
    <Navbar />
    
    <div className="min-h-screen bg-gray-100 mt-16">
      
      {/* Header */}
      <div className="bg-orange-100 text-black py-6 px-4 lg:py-10 lg:px-6 flex flex-col lg:flex-row items-center justify-between">
        <div className="mb-4 lg:mb-0 ml-10">
          <h1 className="text-2xl lg:text-3xl font-bold py-2">Freelancer List</h1>
          <p className="text-sm lg:text-base py-2 ">All the Lorem Ipsum generators on the Internet tend to repeat.</p>
        </div>
        <div className="relative w-full lg:w-auto">
          <input 
            type="text" 
            placeholder="Keyword or freelancer name" 
            className="px-4 py-6 w-full lg:w-96 rounded-lg border focus:outline-none text-black" 
          />
          <button className="bg-green-950 hover:bg-green-900 text-white px-6 py-2 rounded-lg  absolute right-4 top-4">
            Search
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10 lg:py-14 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Categories</h3>
          <div>
            <label className="block mb-2"><input type="checkbox" /> Business</label>
            <label className="block mb-2"><input type="checkbox" /> Digital Marketing</label>
            <label className="block mb-2"><input type="checkbox" /> Graphics & Design</label>
            <label className="block mb-2"><input type="checkbox" /> Lifestyle</label>
            <label className="block mb-2"><input type="checkbox" /> Music & Audio</label>
            <p className="text-green-900 mt-2 cursor-pointer hover:text-green-950">+ Show More</p>
          </div>

          <h3 className="font-bold mt-8 mb-4">Regions</h3>
          <div>
            <label className="block mb-2"><input type="checkbox" /> Boston</label>
            <label className="block mb-2"><input type="checkbox" /> Florida</label>
            <label className="block mb-2"><input type="checkbox" /> Los Angeles</label>
            <label className="block mb-2"><input type="checkbox" /> Miami</label>
            <label className="block mb-2"><input type="checkbox" /> New York</label>
            <p className="text-green-900 mt-2 cursor-pointer hover:text-green-950">+ Show More</p>
          </div>

          <h3 className="font-bold mt-8 mb-4">Types</h3>
          <select className="w-full p-2 border rounded-lg mb-4">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>

          <h3 className="font-bold mt-8 mb-4">Gender</h3>
          <select className="w-full p-2 border rounded-lg mb-4">
            <option>All Genders</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <h3 className="font-bold mt-8 mb-4">English Level</h3>
          <select className="w-full p-2 border rounded-lg mb-4">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Fluent</option>
          </select>

          <button className="bg-green-900 hover:bg-green-950 text-white py-2 px-4 w-full mt-4">Find Listing</button>
        </div>

        {/* Freelancer List */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <p className="mb-4 lg:mb-0">Showing all 8 results</p>
            <select className="border p-2 rounded-lg">
              <option>Sort by (Default)</option>
              <option>Rating</option>
              <option>Hourly Rate</option>
            </select>
          </div>

          {freelancers.map((freelancer) => (
            <div key={freelancer.id} className="bg-white p-6 mb-6 rounded-lg shadow-md flex flex-col lg:flex-row items-start">
              <img 
                src={freelancer.profileImage} 
                alt={freelancer.name} 
                className="w-20 h-20 rounded-full object-cover mb-4 lg:mb-0 lg:mr-6" 
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{freelancer.name}</h3>
                <p className="text-gray-600">{freelancer.role}</p>
                <div className="flex items-center my-2">
                  <span className="mr-4">⭐ {freelancer.rating}</span>
                  <span className="mr-4">📍 {freelancer.location}</span>
                  <span>{freelancer.rate}</span>
                </div>
                <p className="text-gray-600 mt-2">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                </p>
                <div className="flex mt-2 flex-wrap gap-2">
                  {freelancer.skills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button className="mt-4 lg:mt-0 lg:ml-6 bg-green-900 hover:bg-green-950 text-white px-4 py-2 rounded-lg">
                View Profile
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

export default FreelancerList;
