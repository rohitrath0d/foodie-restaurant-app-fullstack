import { API_ROUTES } from '../utils/api';
import axiosInstance, { setupAxiosInterceptors } from '../utils/axiosInstance';

import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Axios instance setup   --> did this setup with interceptors in utils/axiosInstance.js
// const axiosInstance = axios.create({
//   baseURL: API_ROUTES.AUTH,
//   withCredentials: true,
// });

// export const useAuthStore = create(
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      // setUser: (user) => set({ user }),
      // logout: () => set({ user: null }),
      token: null,
      isLoading: false,
      error: null,

      // Initialize interceptors when store is created
      init: () => {
        setupAxiosInterceptors(
          () => get().token, // getToken function
          () => set({ user: null, token: null }) // onUnauthorized callback
        );
      },

      register: async ({userName, email, password, phone, address, answer}) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post(`${API_ROUTES.AUTH}/register`, {
            userName,
            email,
            password,
            phone,
            address,
            answer,
          });
          set({ isLoading: false });
          return response.data;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Registration failed'
              : 'Registration failed',
          });
          return null;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post(`${API_ROUTES.AUTH}/login`, {
            email,
            password,
          });
          console.log('LoginResponse', response);
          set({
            isLoading: false,
            user: response.data.loginUser,
            token: response.data.token // Optional: Store token separately.  Not recommended (mixes auth state with user data)
          });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Login failed'
              : 'Login failed',
          });
          return false;
        }
      },
      

      // for logout -> we need to be stating user as null.
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axiosInstance.post(`${API_ROUTES.AUTH}/logout`);
          set({ 
            user: null,
            token: null,
            isLoading: false
          });
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Logout failed'
              : 'Logout failed',
          });
        }
      },

        refreshAcessToken: async () => {
        try {
          const response = await axiosInstance.post('/refresh-token');
          set({ 
            user: response.data.user,
            token: response.data.token
           }); // Update user data

          return true;
        } catch (e) {
          console.log(e);
          set({
            user: null,
            token: null,
          }); // Force logout if refresh fails

          return false;
        }
      },

      //  Adding these new methods here, so that Role Check happens seamlessly.
      isAdmin: () => {
        const user = get().user;
        return user?.usertype === 'admin' || user?.usertype === 'superadmin';
      },

      
      isSuperAdmin: () => {
        return get().user?.usertype === 'superadmin';
      },

    // getToken: () => get().token, // Helper to access token
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token // Persist token if storing it
      }),
    }
  )
);



// Initialize interceptors when store is created
useAuthStore.getState().init();

export default useAuthStore;


// // Helper function for error handling
// function handleError(error, set) {
//   const errorMessage = axios.isAxiosError(error)
//     ? error.response?.data?.message || error.message
//     : 'Request failed';
  
//   set({
//     isLoading: false,
//     error: errorMessage,
//   });
// }                                               

// This helper function is for error handling. 
// handleError(error, set);   -> after this function, only this much line is needed in the catch block, so looks optimized.
