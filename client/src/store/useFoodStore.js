/* eslint-disable no-unused-vars */
import { API_ROUTES } from '../utils/api';

import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: API_ROUTES.FOOD,
  withCredentials: true,
});

export const useFoodStore = create(
  persist(
    (set, get) => ({
      // user: null,
      food: [],
      isLoading: false,
      error: null,

      createFood: async (title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post(`${API_ROUTES.FOOD}/createFood`, {
            title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating
          });
          set({ isLoading: false });
          return response.data.newFood;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Food item creation failed'
              : 'Food item creation failed',
          });
          return null;
        }
      },

      getAllFood: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(`${API_ROUTES.FOOD}/getAllFood`);
          console.log('FoodResponse', response);
          set({ isLoading: false, foods: response.data.foods });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'No Food item found'
              : 'No Food item found',
          });
          return false;
        }
      },

      // take id here,
      getFoodById: async (foodId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(`${API_ROUTES.FOOD}/getFoodByRestaurantId/${foodId}`);

          set({ isLoading: false, food: response.data.food });
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'No food item found by this id'
              : 'No food item found by this id',
          });
        }
      },

      // take id here,
      getFoodByRestaurantId: async (restaurantId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(`${API_ROUTES.FOOD}/getFoodByRestaurantId/${restaurantId}`);

          set({ isLoading: false, food: response.data.food });
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'No food item found under this restaurant id'
              : 'No food item found under this restaurant id',
          });
        }
      },



      // updatedData on the frontend → becomes req.body on the backend
      // req.body on the backend → destructured into fields like title, price, etc.
      // Those fields are used to update the foodModel


      //     updateFood: async (foodID, updatedData) => {
      //   set({ isLoading: true, error: null });
      //   try {
      //     const response = await axiosInstance.put(
      //       `${API_ROUTES.FOOD}/updateFood/${foodID}`,
      //       updatedData
      //     );
      //     set({ isLoading: false });
      //     return response.data.updatedFood;
      //   } catch (error) {
      //     set({
      //       isLoading: false,
      //       error: axios.isAxiosError(error)
      //         ? error?.response?.data?.error || 'Update failed'
      //         : 'Update failed',
      //     });
      //     return null;
      //   }
      // }




      // take id here,
      updateFood: async (foodID, updatedFood) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.put(`${API_ROUTES.FOOD}/updateFood/${foodID}`, updatedFood);
          set({ user: null, isLoading: false });
          return response.data.updateFood;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Food item update failed'
              : 'Food item update failed',
          });
          return null;
        }
      },

      // take id here,
      deleteFood: async (foodId) => {
        set({ isLoading: true, error: null });
        try {
          await axiosInstance.delete(`${API_ROUTES.FOOD}/deleteFood/${foodId}`);
          set({ user: null, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Food item cannot be deleted.'
              : 'Food item cannot be deleted.',
          });
        }
      },

      // refreshAcessToken: async () => {
      //   try {
      //     await axiosInstance.post('/refresh-token');
      //     return true;
      //   } catch (e) {
      //     console.log(e);
      //     return false;
      //   }
      // },
    }),
    {
      name: 'food-storage',
      partialize: (state) => ({
        //  user: state.user 
        food: state.food
      }),
    }
  )
);
