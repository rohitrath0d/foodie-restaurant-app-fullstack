// src/utils/axiosInstance.js
import axios from 'axios';
import { API_ROUTES } from '../utils/api';

// Create basic axios instance
const axiosInstance = axios.create({
  baseURL: API_ROUTES.AUTH,
  withCredentials: true,
});

// Function to setup interceptors (will be called from auth store)
export const setupAxiosInterceptors = (getToken, onUnauthorized) => {
  // Request interceptor
  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;