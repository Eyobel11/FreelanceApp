import axios from 'axios';

const API = axios.create({
  baseURL:  'https://freelanceapp-backend.onrender.com/api',
});

// Add token to headers if it exists
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;
