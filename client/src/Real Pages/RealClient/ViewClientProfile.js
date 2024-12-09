import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaStar, FaEnvelope, FaPhone, FaUsers , FaUserCircle, FaBriefcase, FaCalendarAlt, FaLanguage, FaTransgender } from 'react-icons/fa';
// import Footer from '../Real DashBoard/Footer';
// import Navbar from '../Real DashBoard/Navbar';
import { Link, useParams } from 'react-router-dom';  // To get userId from URL
import { useSelector } from 'react-redux';  // To get userId from Redux
import axios from '../utils/axios'



const ViewClientProfile = () => {

  const { userId: paramUserId } = useParams();  // Get userId from route params
  const reduxUserId = useSelector((state) => state.auth.userId);  // Get userId from Redux
  const userId = paramUserId || reduxUserId;  // Use paramUserId if it exists, else use reduxUserId
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);  // Add state for jobs



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/clientprofile/${userId}`);
        setProfile(response.data);
        const jobsResponse = await axios.get(`/jobpost/client/${userId}`);  // Fetch client jobs
        setJobs(jobsResponse.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);


  


  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
   
    <div className="min-h-screen bg-gray-100 ">

      {/* Header Section */}
      <div className="image-add bg-center bg-cover text-black py-10 px-6 lg:flex lg:items-center lg:justify-between">
        <div className="lg:flex lg:items-center">
          <img
            // src="https://via.placeholder.com/150"
            src={profile.profilePicture ? `http://localhost:5000${profile.profilePicture}`: "https://via.placeholder.com/150" }
            alt="Freelancer"
            className="w-32 h-32 lg:w-48 lg:h-48 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold">{profile.fullName}</h1>
            {/* <p className="text-lg mt-2">Nursing Assistant</p> */}
            <div className="flex items-center space-x-6 mt-4">
              <span className="flex items-center">
                <FaEnvelope className="mr-2 text-gray-600" />
                {profile.email}
              </span>
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                Location: {profile.location}
              </span>
              <span className=" px-3 py-1 rounded-full text-sm">
                ⭐ 0 (0 Reviews)
              </span>
            </div>
          </div>
        </div>
        
      </div>

      <div className="container mx-auto mt-10 p-4 lg:p-10 lg:flex lg:space-x-8">
        
        {/* Left Column: Freelancer Information */}
        <div className="lg:w-2/3 space-y-8">
          
          {/* About Me Section */}
          <div className=" p-6">
            <h3 className="text-2xl font-bold mb-4">About Company</h3>
            
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: profile.description }}
              ></div>
          </div>

          
          {/* Posted Services Section */}
          <div className=" p-6">
            <h3 className="text-2xl font-bold mb-4">Posted Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              
                  {jobs.map(job => (
                    <Link to={`/client/job/${job._id}`} >
                <div key={job._id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                  <img 
                    // src={`localhost:/5000${job.featuredImage}` || 'https://via.placeholder.com/150'}  // Placeholder if no image
                    src={job.featuredImage ? `http://localhost:5000${job.featuredImage}` : "https://via.placeholder.com/150"}

                    alt="Service Image"
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <div className="text-gray-500 text-sm">{job.category}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex items-center mt-2 mb-4">
                    <FaStar className="text-yellow-400" />
                    <span className="ml-1 text-gray-700 font-bold">{job.rating || 'N/A'}</span>
                    <span className="ml-2 text-gray-500">({job.reviewCount || 0} Reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">{profile.fullName}</div>
                    <div className="text-gray-900 font-bold">Starting at: ${job.minPrice}</div>
                  </div>
                </div>
                
                </Link>
              ))}


              {/* Add more services here if needed */}
            </div>
          </div>

         {/* Reviews Section */}
        <div className="mt-6 p-4 sm:w-full md:w-full lg:w-full">
          <h3 className="text-xl font-bold mb-4">3 Reviews</h3>
          <div className="space-y-4">
            {/* Review 1 */}
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="font-semibold">Admin</p>
              <p className="text-yellow-500">⭐⭐⭐⭐☆</p>
              <p className="text-gray-600">Keep up the good work</p>
            </div>

            {/* Review 2 */}
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="font-semibold">Eyobel</p>
              <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-600 ">Great job.</p>
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

              {/* <Link to=  "/client/editprofile " className="bg-green-900 text-white py-2 px-6 rounded-lg hover:bg-green-950 transition duration-200">
                Edit Profile
              </Link> */}
            </form>
          </div>
        </div>

        </div>

        

       <div className="lg:w-1/3 space-y-8">
  {/* About the Seller Widget */}
  <div className="bg-white shadow-md rounded-lg p-6">
    <ul className="space-y-4">
      <li className="flex items-center">
        <FaBriefcase className="text-gray-500 mr-2" />
        Categories: {profile.category}
      </li>
      <li className="flex items-center">
        <FaUsers className="text-gray-500 mr-2" />
        Employees: {profile.employees}
      </li>
      <li className="flex items-center">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        Founded Date: {profile.foundedDate}
      </li>
      <li className="flex items-center">
        <FaEnvelope className="text-gray-500 mr-2" />
        Email: {profile.email}
      </li>
      <li className="flex items-center">
        <FaPhone className="text-gray-500 mr-2" />
        Phone Number: {profile.phone}
      </li>
      <li className="flex items-center">
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        Location: {profile.location}
      </li>
    </ul>
  </div>

          {/* Skills Section */}
          
          

        </div>

      </div>
    </div>
    {/* <Footer /> */}
    </>
  );
};

export default ViewClientProfile;
