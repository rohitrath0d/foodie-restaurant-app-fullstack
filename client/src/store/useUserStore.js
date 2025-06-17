/* eslint-disable no-unused-vars */
import {API_ROUTES} from '../utils/api'
import axios from 'axios'
import { create } from 'zustand'
import {persist} from 'zustand/middleware'
import useAuthStore from './useAuthStore'

// Axios instance setup
// const axiosInstance = axios.create({
//   baseURL: API_ROUTES.USER,
//   withCredentials: true,
// })

// const userInstance = axios.create({
const userAxios = axios.create({
  baseURL: API_ROUTES.USER,
  withCredentials: true,
})


// Add auth interceptor to inject token
userAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useUserStore =  create(
  persist(
    (set, get) => ({
      isLoading: false,
      error: null,
      user: [],


      // createUser -> we dont need this, coz for the creation of user, we did in authController and not user. user is solely for handling the user data after login.

      getUser: async (id) => {
        set({isLoading: true, error: null});
        try {
          // const response = await axiosInstance.get(`${API_ROUTES.USER}/getUser/${id}`);
          // const response = await userInstance.get(`/getUser/${id}`);
          const response = await userAxios.get(`/getUser/${id}`);
          set({isLoading: false});
          return response.data.getUser;
          
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'User not found'
              : 'User not found'
          });
          return null;
        }
      },

      // update user
      updateUser: async (id, { userName, email, address, phone}) => {
        set({isLoading: true, error: null});
        try {
          // const response = await axiosInstance.put(`${API_ROUTES.USER}/updateUser/${id}`, {
          // const response = await userInstance.put(`/updateUser/${id}`, {
          const response = await userAxios.put(`/updateUser/${id}`, {
            userName,
            email,
            address,
            phone
          }
        );
        set({isLoading: false});
        return response.data.updatedUser;
        } catch (error) {
          set({isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'User update operation failed'
              : "User update operation failed"
          })
        }
      },

      userUpdatePassword: async(id, { oldPassword, newPassword }) => {
        set({isLoading: true, error: null});
        try {
          // const response = await axiosInstance.put(`${API_ROUTES.USER}/updatePassword/${id}`, {
          // const response = await userInstance.put(`/updatePassword/${id}`, {
          const response = await userAxios.put(`/updatePassword/${id}`, {
            oldPassword,
            newPassword
          });
          set({isLoading: false});
          return response.data.user;      // we can give whatever name we want here, bcoz frontend will unpack the data and use it within its own confinements/ defined names.
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'User password update operation failed'
              : "User password update operation failed"
          });
        }
      },

      // reset Password -> probably with a question asked at the time of registration.
      userResetPassword: async (id, { answer, newPassword }) => {
        set({isLoading: true, error: null});
        try {
          // const response = await axiosInstance.put(`${API_ROUTES.USER}/resetPassword/${id}`, {
          // const response = await userInstance.put(`/resetPassword/${id}`, {
          const response = await userAxios.put(`/resetPassword/${id}`, {
            answer,
            newPassword
          });
          set({isLoading: false});
          return response.data.user;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'User password reset operation failed'
              : "User password reset operation failed"
          });
        }
      },

      // delete user
      deleteUser: async (id) => {
        set({isLoading: true, error: null});
        try {
          // const response = await axiosInstance.delete(`${API_ROUTES.USER}/deleteUser/${id}`);
          // const response = await userInstance.delete(`/deleteUser/${id}`);
          const response = await userAxios.delete(`/deleteUser/${id}`);
          set({isLoading: false});
          return response.data.message; // Assuming the backend returns a message on successful deletion
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'User deletion operation failed'
              : "User deletion operation failed"
          });
        }
      },
    }),
     {
      name: 'user-storage',
      partialize: (state) => ({
        // user: state.user,
        user: state.tags,
      }),
    }
  )
)