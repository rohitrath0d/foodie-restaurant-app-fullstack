/* eslint-disable no-unused-vars */
import { API_ROUTES } from '../utils/api';

import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: API_ROUTES.TAGS,
  withCredentials: true,
});

export const useTagStore = create(
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
          const response = await axiosInstance.post(`${API_ROUTES.TAGS}/createTag`,
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
          const response = await axiosInstance.get(`${API_ROUTES.TAGS}/getAllTags`);
          set({ tags: response.data.tags, isLoading: false });
        } catch (error) {
          set({ isLoading: false, error: error.response?.data?.message || 'Error fetching tags' });
        }
      },


      getTagById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(`${API_ROUTES.TAGS}/getTagById/${id}`);
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
          const response = await axiosInstance.put(`${API_ROUTES.TAGS}/updateTag/${id}`, {
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
          await axiosInstance.delete(`${API_ROUTES.TAGS}/deleteTag/${id}`);
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
    }))
);
