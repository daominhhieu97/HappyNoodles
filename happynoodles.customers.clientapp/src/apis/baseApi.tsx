import axios from 'axios';
import { store } from '../store/store.tsx';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7232/api', // Adjust base URL as per your backend
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;