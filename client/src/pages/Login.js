import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../utils/axios'; 
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', { email, password });
  
      if (data && data.role) {
        localStorage.setItem('token', data.token); // Save token in localStorage
        dispatch(loginSuccess({ user: data, role: data.role })); // Pass the user and role directly
  
        if (data.role === 'freelancer') {
          navigate('/dashboard/freelancer');
        } else if (data.role === 'client') {
          navigate('/dashboard/client');
        }
      } else {
        console.error('Invalid response structure:', data);
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
    }
  };
  

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const { data } = await axios.post('/auth/google-auth', { token: credential });
      localStorage.setItem('token', data.token); 
      dispatch(loginSuccess({ user: data.user, role: data.user.role }));

      if (data.user.role === 'freelancer') {
        navigate('/dashboard/freelancer');
      } else if (data.user.role === 'client') {
        navigate('/dashboard/client');
      }

    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Error:', error);
  };

  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
