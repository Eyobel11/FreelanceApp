import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaBriefcase } from "react-icons/fa";
import Navbar from "../Real DashBoard/Navbar";
import Footer from "../Real DashBoard/Footer";

const JobDetailDash = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 mt-16">
        {/* Job Header */}
        <div className="bg-orange-50 py-10 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44 rounded-t-lg">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Left Side: Job Info */}
            <div className="flex items-center mb-6 lg:mb-0">
              <img
                src="https://via.placeholder.com/100"
                alt="Company Logo"
                className="w-20 h-20 rounded-full mr-6"
              />
              <div>
                <h1 className="text-2xl font-bold">Senior/ Staff Nurse</h1>
                <p className="text-green-600">Upwork</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <p className="text-gray-500">$50 - $100 / week</p>
                  <p className="text-gray-500">Business, Developers</p>
                  <p className="text-gray-500">Full Time</p>
                </div>
              </div>
            </div>

            {/* Right Side: Apply Button */}
            <div className="text-right">
              <p className="text-gray-500 mb-2">Application ends:</p>
              <p className="font-bold mb-4">October 7, 2029</p>
              <button className="bg-green-900 hover:bg-green-950 text-white px-6 py-3 md:px-10 md:py-4 rounded-md">
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Job Overview Section */}
        <div className="container mx-auto py-8 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44">
          <h2 className="text-xl font-bold mb-4">Job Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Overview Items */}
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Date Posted</p>
                <p className="text-gray-500">October 7, 2022</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-500">New York</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Offered Salary</p>
                <p className="text-gray-500">$50 - $100 / week</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Experience</p>
                <p className="text-gray-500">1 Year</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Expiration Date</p>
                <p className="text-gray-500">October 6, 2029</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Industry</p>
                <p className="text-gray-500">Management</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Qualification</p>
                <p className="text-gray-500">Associate Degree</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-900 mr-4" />
              <div>
                <p className="font-semibold">Career Level</p>
                <p className="text-gray-500">Officer</p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Job Description</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla scelerisque, velit nec
              volutpat ultricies, eros purus consequat massa, vitae vehicula turpis nunc eget nunc.
              Etiam imperdiet velit ex, eget tempus risus hendrerit non. Suspendisse lobortis libero
              vitae neque lacinia, et volutpat felis ornare.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetailDash;
