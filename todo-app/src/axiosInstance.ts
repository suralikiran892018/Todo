import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust this to your backend API URL
  withCredentials: true, // Include credentials like cookies, if needed
});

export default axiosInstance;
