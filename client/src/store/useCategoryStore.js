/* eslint-disable no-unused-vars */
import { API_ROUTES } from '../utils/api';

import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: API_ROUTES.CATEGORY,
  withCredentials: true,
});

export const useCategoryStore = create(
  persist(
    (set, get) => ({
      // user: null,
      category: [],
      isLoading: false,
      error: null,

      createCategory: async (category) => {
        const { title, imageUrl } = category;        //  Refactor createTag to accept a tag object   // Destructure the category object
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post(`${API_ROUTES.CATEGORY}/createCategory`, {
          title, imageUrl
          });
          set({ isLoading: false });
          return response.data.category;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Category creation failed'
              : 'Category creation failed',
          });
          return false;
        }
      },

      getAllCategory: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(`${API_ROUTES.CATEGORY}/getAllCategory`);
          console.log('categoryResponse', response);
          set({ isLoading: false,  category: response.data.categories });      // Changed from categories to category. Because in backend controller of getAllCategory, we used the res.send as {categories}, and hence here in frontend we are passing category (singular name for the plurals too).
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Category cannot be found'
              : 'Category not found',
          });
          return false;
        }
      },

      // take id here,
      updateCategory: async (id,{ title, imageUrl}) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.put(`${API_ROUTES.CATEGORY}/updateCategory/${id}`, {title, imageUrl});

          set({ isLoading: false, food: response.data.updateCategory });


          // another way of initializing a category
          // set(state => ({
          //   isLoading: false,
          //   categories: state.categories.map(cat => 
          //     cat._id === id ? response.data.updatedCategory : cat
          //   )


        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Category update failed'
              : 'Category update failed',
          });
          return false;
        }
      },

      // take id here,
      deleteCategory: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.delete(`${API_ROUTES.CATEGORY}/deleteCategory/${id}`);
          console.log("Deleted:", response.data.message);
          // set({ isLoading: false, food: response.data.food });
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to delete category'
              : 'Failed to delete category',
          });
          return false;                         // Operation failed (like a switch: yes or no)
                                                // You want to clearly say: “This action didn’t work.”
        }
      },
    }),
    // {
    //   name: 'category-storage',
    //   partialize: (state) => ({
    //     //  user: state.user 
    //     category: state.category
    //   }),
    // }
  )
);
