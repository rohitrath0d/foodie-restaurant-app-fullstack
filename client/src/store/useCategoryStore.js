/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { API_ROUTES } from '../utils/api';

import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { useAuthStore } from './useAuthStore';
import useAuthStore from './useAuthStore';

// Axios instance setup
// Create separate axios instance for categories
// const axiosInstance = axios.create({   --> changed naming convention for standardizing name for various instances.
const categoryAxios = axios.create({
  baseURL: API_ROUTES.CATEGORY,
  withCredentials: true,
});

// Add auth interceptor to inject token
categoryAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const useCategoryStore = create(
const useCategoryStore = create(
  persist(
    (set, get) => ({
      // user: null,
      category: [],
      isLoading: false,
      error: null,

      createCategory: async (category) => {

        // const token = useAuthStore.getState().token;

        const { title, imageUrl } = category;        //  Refactor createTag to accept a tag object   // Destructure the category object
        set({ isLoading: true, error: null });
        try {
          // const response = await axiosInstance.post(`${API_ROUTES.CATEGORY}/createCategory`, {
          const response = await categoryAxios.post(`${API_ROUTES.CATEGORY}/createCategory`, {
            title, imageUrl
          }
            // {
            //   headers: {
            //     'Authorization': `Bearer ${token}`,
            //     'Content-Type': 'application/json'
            //   }
            // }
          );
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
          // const response = await axiosInstance.get(`${API_ROUTES.CATEGORY}/getAllCategory`);
          const response = await categoryAxios.get(`${API_ROUTES.CATEGORY}/getAllCategory`);
          console.log('categoryResponse', response);
          set({ isLoading: false, category: response.data.categories });      // Changed from categories to category. Because in backend controller of getAllCategory, we used the res.send as {categories}, and hence here in frontend we are passing category (singular name for the plurals too).
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
      updateCategory: async (id, updateCategory) => {

        const { title, imageUrl } = updateCategory

        // console.log('Updating category with ID:', id); // Debug log
        console.log('Received in store - ID:', id, 'Data:', updateCategory);

        // if (!id) {
        //   throw new Error('No category ID provided');
        // }

        if (!id || typeof id !== 'string') {
          set({ error: 'Invalid category ID', isLoading: false });
          return false;
        }

        set({ isLoading: true, error: null });

        try {
          // const response = await axiosInstance.put(`${API_ROUTES.CATEGORY}/updateCategory/${id}`, { title, imageUrl });
          const response = await categoryAxios.put(`${API_ROUTES.CATEGORY}/updateCategory/${id}`, { title, imageUrl });
          // set({ isLoading: false, category: response.data.updateCategory });

          // // Verify the response contains the updated category
          // if (!response.data?._id) {
          //   throw new Error('Invalid response format');
          // }

          // another way of initializing a category
          // Update local state
          set(state => ({
            isLoading: false,
            category: state.category.map(category =>
              category._id === id ? response.data.updatedCategory : category
            )
          }));

          return true;
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

        if (!id) {
          set({ error: "Invalid category ID" });
          return false;
        }

        set({ isLoading: true, error: null });
        try {
          // const response = await axiosInstance.delete(`${API_ROUTES.CATEGORY}/deleteCategory/${id}`);
          const response = await categoryAxios.delete(`${API_ROUTES.CATEGORY}/deleteCategory/${id}`);
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
    {
      name: 'category-storage',
      partialize: (state) => ({
        //  user: state.user 
        category: state.category
      }),
    }
  )
);


// // Reuse the same error handler
// function handleError(error, set) {
//   const errorMessage = axios.isAxiosError(error)
//     ? error.response?.data?.message || error.message
//     : 'Request failed';

//   set({
//     isLoading: false,
//     error: errorMessage,
//   });
// }

export default useCategoryStore;