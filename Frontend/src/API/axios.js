import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://bookmyshow-ihmd.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// This will run before every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});