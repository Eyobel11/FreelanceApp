import React, { useState } from 'react';
import Navbar from '../Real DashBoard/Navbar';
import Footer from '../Real DashBoard/Footer';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../utils/axios'; // Assuming axios is set up for API calls
import { FiUserPlus, FiEye, FiEyeOff } from 'react-icons/fi'; // For the register button and password toggle icons
import { FaUserTie, FaUserNinja } from 'react-icons/fa'; // For freelancer and employer icons
import { useDispatch } from 'react-redux'; // Import useDispatch from redux
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Swal from 'sweetalert2';

const RegisterDash = () => {
  const [role, setRole] = useState('Freelancer'); // default role
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false); // For password toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password toggle
  const [error, setError] = useState(''); // Error handling
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  
  const dispatch = useDispatch(); // Dispatch for redux actions
  const navigate = useNavigate(); // Navigate for redirection

  // Update form data on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error message when user types
  };

  // Password strength checker
  const isPasswordStrong = (password) => {
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Check if password is strong
    if (!isPasswordStrong(formData.password)) {
      setError('Password must be at least 8 characters, include an uppercase letter, a number, and a special character.');
      return;
    }

    // Terms and conditions acceptance check
    if (!formData.termsAccepted) {
      setError('Please accept the terms and conditions.');
      return;
    }

    // Submit registration
    try {
      setIsSubmitting(true); // Set submission state

      // API call to register user
      const { data } = await axios.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role.toLowerCase(),
      });

      localStorage.setItem('token', data.token); // Save token in localStorage
      console.log('Registration successful:', data);

      Swal.fire({
        title: 'Registered!',
        text: 'You have been successfully registered.',
        icon: 'success',
        confirmButtonColor: '#3E4B40',
      });
      
      navigate('/loginDash')
      // You can redirect the user or show a success message here
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
      console.error('Error during registration:', error);
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  // Google OAuth success handler
  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const { data } = await axios.post('/auth/google-auth', { token: credential });

      localStorage.setItem('token', data.token); // Save token in localStorage
      console.log('Google Registration Success:', data);
    } catch (error) {
      setError('Google registration failed. Please try again.');
      console.error('Google Registration Error:', error);
    }
  };

  // Google OAuth failure handler
  const handleGoogleFailure = (error) => {
    setError('Google registration failed. Please try again.');
    console.error('Google Registration Error:', error);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen mt-36">
        <div className="bg-transparent border-2 border-orange-200 p-8  rounded-lg shadow-lg w-full max-w-xl mb-11">
          <h2 className="text-3xl font-bold text-center mb-4">Register</h2>
          <p className="text-center text-gray-600 mb-6">
            Give your visitor a smooth online experience with a solid UX design
          </p>

          {/* Role Selector */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 rounded-l-lg border flex items-center ${
                role === 'Freelancer' ? 'bg-green-800 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setRole('Freelancer')}
            >
              <FaUserNinja className="mr-2" />
              Freelancer
            </button>
            <button
              className={`px-4 py-2 rounded-r-lg border flex items-center ${
                role === 'Client' ? 'bg-green-800 text-white' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setRole('Client')}
            >
              <FaUserTie className="mr-2" />
              Employer
            </button>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-600 text-center mb-4">{error}</div>}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Full Name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-5"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Confirm Password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-4"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                required
                className="h-4 w-4 text-green-500 border-gray-300 rounded"
              />
              <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900">
                You accept our{' '}
                <a href="#" className="text-orange-400">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-green-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center px-4 py-4 border border-transparent text-lg font-medium rounded-md text-white ${
                isSubmitting ? 'bg-gray-400' : 'bg-green-800'
              } hover:bg-green-700`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
              <FiUserPlus className="ml-2" />
            </button>
          </form>

          {/* Google Register */}
          <div className="mt-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">Or Register With</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              className="w-full flex justify-center items-center"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterDash;
