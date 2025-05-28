/* eslint-disable no-unused-vars */
import { API_ROUTES } from '../utils/api';

import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: API_ROUTES.AUTH,
  withCredentials: true,
});

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false, 
      error: null,

      register: async (userName, email, password, phone, address, answer ) => {
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
          return response.data.id;
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
          set({ isLoading: false, user: response.data.user });
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
          set({ user: null, isLoading: false });
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
          await axiosInstance.post('/refresh-token');
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
 