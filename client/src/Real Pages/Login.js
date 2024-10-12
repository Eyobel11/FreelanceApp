import React, { useState } from 'react';
import Navbar from '../Real DashBoard/Navbar';
import Footer from '../Real DashBoard/Footer';
import axios from '../utils/axios'; // Import Axios for API requests
import { useDispatch } from 'react-redux'; // Import useDispatch from redux
import { loginSuccess } from '../slices/authSlice'; // Import loginSuccess action
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import icons from react-icons

const LoginDash = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility

  const dispatch = useDispatch(); // Dispatch for redux actions
  const navigate = useNavigate(); // Navigate for redirection

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', { email, password }); // Post login credentials to backend
      
      if (data && data.role) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        dispatch(loginSuccess({ user: data, role: data.role })); // Dispatch login data to Redux

        // Navigate based on user role
        if (data.role === 'freelancer') {
          navigate('/dashboardDash/freelancer', {replace: true});
        } else if (data.role === 'client') {
          navigate('/dashboardDash/client', {replace: true});
        }
      } else {
        console.error('Invalid response structure:', data);
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-orange-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-4">Log In</h2>
          <p className="text-center text-gray-600 mb-6">
            Give your visitor a smooth online experience with a solid UX design
          </p>

          <form onSubmit={handleSubmit} className="space-y-4"> {/* Add handleSubmit to form */}
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email} // Bind email state
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Email"
              />
            </div>

            {/* Password Input with Toggle Visibility */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={password} // Bind password state
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Password"
              />
              {/* Toggle Icon for Show/Hide Password */}
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer mt-5"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <AiFillEye className="h-5 w-5  text-gray-500" />
                ) : (
                  <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
                )}
              </span>
            </div>

            {/* Keep Me Signed In Checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Keep me signed in
                </label>
              </div>

              {/* Forgotten Password */}
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Forgotten password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-800 text-white py-2 rounded-lg text-lg hover:bg-green-900"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginDash;
