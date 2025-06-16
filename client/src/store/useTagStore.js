/* eslint-disable no-unused-vars */
import { API_ROUTES } from '../utils/api';

import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './useAuthStore';

// // Axios instance setup
// const axiosInstance = axios.create({
//   baseURL: API_ROUTES.TAGS,
//   withCredentials: true,
// });


// Axios instance setup
const tagAxios = axios.create({
  baseURL: API_ROUTES.TAGS,
  withCredentials: true,
});


// Add auth interceptor to inject token
tagAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


const useTagStore = create(
  persist(
    (set, get) => ({
      // user: null,
      tags: [],
      isLoading: false,
      error: null,

      // createTag: async (name, color, isGlobal) => {
      // createTag: async (name, color) => {
      createTag: async (tag) => {                    //  Refactor createTag to accept a tag object
        const { name, color } = tag;
        set({ isLoading: true, error: null });
        try {
          // const response = await axiosInstance.post(`${API_ROUTES.TAGS}/createTag`,
          const response = await tagAxios.post(`/createTag`,
            {
              name,
              color,
              // isGlobal,
            }
          );
          // set((state) => ({
          //   tags: [...state.tags, response.data.tag],
          //   isLoading: false,
          // }));

          set({ isLoading: false });
          return response.data.tag; // Return the created tag

        } catch (error) {
          set({ isLoading: false, error: error.response?.data?.message || 'Error creating tag' });
        }
      },

      getAllTags: async () => {
        set({ isLoading: true, error: null });
        try {
          // const response = await axiosInstance.get(`${API_ROUTES.TAGS}/getAllTags`);
          const response = await tagAxios.get(`/getAllTags`);
          console.log('TagResponse', response);
          set({ tags: response.data.tags, isLoading: false });
        } catch (error) {
          set({ isLoading: false, error: error.response?.data?.message || 'Error fetching tags' });
        }
      },


      getTagById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // const response = await axiosInstance.get(`${API_ROUTES.TAGS}/getTagById/${id}`);
          const response = await tagAxios.get(`/getTagById/${id}`);
          // set({ tags: response.data.tags, isLoading: false });      // --> 1. getTagById is overwriting the entire tags list. If you're fetching one tag by ID, then this is wrong — you're updating the entire list with just one. It should be:           return response.data.tag;
          set({ isLoading: false });
          return response.data.tag;
        } catch (error) {
          set({ isLoading: false, error: error.response?.data?.message || 'Error fetching tags' });
        }
      },

      // updateTag: async (id, { name, color, isGlobal }) => {
      updateTag: async (id, { name, color }) => {
        set({ isLoading: true, error: null });
        try {
          // const response = await axiosInstance.put(`${API_ROUTES.TAGS}/updateTag/${id}`, {
          const response = await tagAxios.put(`/updateTag/${id}`, {
            name,
            color,
            // isGlobal,
          });
          set((state) => ({
            tags: state.tags.map((tag) => (tag.id === id ? response.data.tag : tag)),
            isLoading: false,
          }));
        } catch (error) {
          set({ isLoading: false, error: error.response?.data?.message || 'Error updating tag' });
        }
      },

      deleteTag: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // await axiosInstance.delete(`${API_ROUTES.TAGS}/deleteTag/${id}`);
          await tagAxios.delete(`/deleteTag/${id}`);
          set((state) => ({
            tags: state.tags.filter((tag) => tag.id !== id),
            isLoading: false,
          }));
          return true;
        } catch (error) {
          set({ isLoading: false, error: error.response?.data?.message || 'Error deleting tag' });
        }
        return false;
      },
    }),
     {
      name: 'tag-storage',
      partialize: (state) => ({
        // user: state.user,
        tags: state.tags,
      }),
    }
  )
);

export default useTagStore;