// import axios from 'axios';
// import {useAuthStore} from '../store/useAuthStore'             // No longer imports useAuthStore in the API config. Uses localStorage directly for token access

export const API_BASE_URL = 'http://localhost:8080/api/v1'

export const API_ROUTES = {
  AUTH :  `${API_BASE_URL}/auth`,
  USER: `${API_BASE_URL}/user`,
  RESTAURANT : `${API_BASE_URL}/restaurant`,
  CATEGORY : `${API_BASE_URL}/category`,
  FOOD : `${API_BASE_URL}/food`,
  ORDERS : `${API_BASE_URL}/orders`,
  TAGS: `${API_BASE_URL}/tags`,
  CART: `${API_BASE_URL}/cart`,

  // ADMIN:  `${API_BASE_URL}/admin`,
};

// export const API_ENDPOINTS = {
//   REGISTER: `${API_ROUTES.AUTH}/register`,
//   LOGIN: `${API_ROUTES.AUTH}/login`,
//   // USER_PROFILE: `${API_ROUTES.USER}/profile`,
//   // etc.
//   RESTAURANT: `${API_ROUTES.RESTAURANT}/restaurant`
// };

// Base authenticated axios instance
// export const authAxios = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
// });

// Lazy-load interceptor setup to avoid circular dependencies. Prevents multiple interceptor registrations. Safe for server-side rendering (checks window)
// let isInterceptorSetup = false;


// Add request interceptor to inject token
// authAxios.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   // config.headers['Content-Type'] = 'application/json';
//   return config;
// });

// export const setupAxiosInterceptors = () => {
//   if (!isInterceptorSetup) {
//     authAxios.interceptors.request.use((config) => {
//       const token = typeof window !== 'undefined' 
//         ? localStorage.getItem('authToken') 
//         : null;
      
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     });
//     isInterceptorSetup = true;
//   }
// };