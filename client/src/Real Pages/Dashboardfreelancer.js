import React, { useEffect, useState } from 'react';
import { FaHome, FaBriefcase, FaClipboardList, FaUsers, FaHeart, FaEnvelope, FaBell, FaUserCircle, FaLeftFromBracket } from 'react-icons/fa';
import { Link, Outlet,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice'; // Import the logout action
import Swal from 'sweetalert2';
import image from "../assets/logofinal.png";
import axios from '../utils/axios';




const DashboardFreelancer = () => {

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);  // Fetch user data from Redux

  const { userId: paramUserId } = useParams(); // Get userId from route params
  const reduxUserId = useSelector((state) => state.auth.user._id); // Get userId from Redux
  const userId = paramUserId || reduxUserId; // Use paramUserId if it exists, else use reduxUserId


  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will need to log in again to continue.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3E4B40',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());  // Dispatch the logout action to clear state
        localStorage.removeItem('token');  // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/loginDash');  // Redirect to login page
      }
    });
  };

  const [profile, setProfile] = useState({});

 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/freelancerprofile/${userId}`);
        console.log('Profile Data:', response.data); // Log profile data
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  
  


  // const user = {
  //   name: "John Doe",
  //   role: "Freelancer",
  //   image: "https://via.placeholder.com/150", // Placeholder image URL
  // };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-50 border-b-black border-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side: Logo */}
            <div className="flex-shrink-0">
              
            <img
                className="h-10 w-auto sm:h-10 lg:h-16 object-contain"
                src={image}
                alt="Logo"
              />
              
            </div>

            {/* Center: Menu Items */}
            <div className="hidden md:flex space-x-4">
              <a href="/freelancer" className="hover:text-gray-400 px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="/freelancer/joblist" className="hover:text-gray-400 px-3 py-2 text-base font-medium">
                Browse Jobs
              </a>
              <a href="/freelancer/contact" className="hover:text-gray-400 px-3 py-2 text-base font-medium">
                Contact-Us
              </a>
            </div>

            {/* Right Side: Notification & Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {/* <FaBell className="text-gray-500 text-2xl" /> */}
              <div className="flex items-center space-x-3">
                <img
                  src={profile?.profileImage ? `http://localhost:5000${profile.profileImage}` : "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>

            {/* Hamburger Icon for mobile view */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleDrawer} className="focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Drawer (for mobile view) */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-30 transform transition-transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleDrawer} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Drawer Menu Items */}
        <ul className="mt-6 space-y-2 px-4">
          <li>
            <a href="/freelancer" className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded">
              Home
            </a>
          </li>
          <li>
            <a href="/freelancer/joblist" className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded">
              Browse Jobs
            </a>
          </li>
 
  
          <li>
            <a href="/freelancer/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded">
              Contact-Us
            </a>
          </li>
        </ul>
      </div>

      {/* Main Layout */}
      <div className="min-h-screen flex flex-col md:flex-row mt-16">
        {/* Sidebar */}
        <aside className="back text-white w-full sm:w-full md:w-64 space-y-6 py-7 px-5">
          {/* User Profile Display */}
          <div className="flex items-center space-x-3 mb-6">
            <img
              src={profile.profileImage ? `http://localhost:5000${profile.profileImage}` : "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
              <Link to={`/freelancer/setprofile/${user._id}`} className="text-xs text-blue-400 hover:underline">
                View Profile
              </Link>
            </div>
          </div>

          {/* Sidebar Nav */}
          <nav className="mt-56">
            <Link
              to="/freelancer"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#313a30] hover:text-white flex items-center"
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>
            <Link
              to="/freelancer/myservice"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#313a30] hover:text-white flex items-center"
            >
              <FaBriefcase className="mr-3" />
              My Services
            </Link>
            <Link to="/freelancer/proposals"
              
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#313a30] hover:text-white flex items-center"
            >
              <FaClipboardList className="mr-3" />
              Proposals
            </Link>
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#313a30] hover:text-white flex items-center"
            >
              <FaUsers className="mr-3" />
              Job Applied
            </a>
            <Link to = "/freelancer/joblist"
             
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#313a30] hover:text-white flex items-center"
            >
              <FaBell className="mr-3" />
              Find Jobs
            </Link>
            <Link to="/freelancer/inbox"
            
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#313a30] hover:text-white flex items-center"
            >
              <FaEnvelope className="mr-3" />
              Messages
            </Link>
            <Link
              to="/freelancer/postservice"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#313a30] hover:text-white flex items-center"
            >
              <FaBriefcase className="mr-3" />
              Post Service
            </Link>
            {/* Profile Options */}
            <div className="mt-6">
              <Link to= "/freelancer/editprofile"
                href="#edit"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#313a30] hover:text-white flex items-center"
              >
                <FaUserCircle className="mr-3" />
                Edit Profile
              </Link>
              <a
                onClick={handleLogout}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#313a30] hover:text-white flex items-center"
              >
                <FaUserCircle className="mr-3" />
                Logout
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardFreelancer;
