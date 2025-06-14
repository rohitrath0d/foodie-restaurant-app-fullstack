/* eslint-disable no-unused-vars */
import { API_ROUTES } from '../utils/api';

import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './useAuthStore';

// Axios instance setup
const foodAxios = axios.create({
  baseURL: API_ROUTES.FOOD,
  withCredentials: true,
});


// Add auth interceptor to inject token
foodAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
          const response = await foodAxios.post(`${API_ROUTES.FOOD}/createFood`, {
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
          const response = await foodAxios.get(`${API_ROUTES.FOOD}/getAllFood`);
          console.log('FoodResponse', response);
          // set({ isLoading: false, foods: response.data.foods }); 
          set({ isLoading: false, food: response.data.foods }); // Changed from foods to food
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
          const response = await foodAxios.get(`${API_ROUTES.FOOD}/getFoodByRestaurantId/${foodId}`);

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
          const response = await foodAxios.get(`${API_ROUTES.FOOD}/getFoodByRestaurantId/${restaurantId}`);

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
          const response = await foodAxios.put(`${API_ROUTES.FOOD}/updateFood/${foodID}`, updatedFood);
          
          // set({ user: null, isLoading: false });
          // IMPORTANT POINT TO BE NOTED:
          //  user: null is needed only when logging out or resetting state — not inside the actual deleteFood() call.
          // If you're calling:  set({ user: null, isLoading: false });
          // This should not be inside your deleteFood/updateFood function unless you're trying to:   log the user out, or  || clear user info after deletion for some reason (which is unusual).

          // router.delete("/deleteFood/:id", authMiddleware, deleteFoodController);      -->> authMiddleware verifies the user token (likely via JWT or session).
          // This means the user must be authenticated, and their identity is used in deleteFoodController (e.g., maybe checking if they own the food item).
          // So on the frontend, when calling deleteFood(id):  Nowhere here should you be setting user: null — that would essentially remove the user from your app state, like logging them out.

          // ✅ When to Use set({ user: null })
          // Only in these cases:   User clicks Log Out    |   Token is invalid and you force logout    |     Your app resets state, e.g., on session timeout.

          set({  isLoading: false });
          return response.data.updateFood;         // Ensure backend returns this
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
      deleteFood: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await foodAxios.delete(`${API_ROUTES.FOOD}/deleteFood/${id}`);
          set({ user: null, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Food item cannot be deleted.'
              : 'Food item cannot be deleted.',
          });
          return true; // Add return value on success
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
    // {
    //   name: 'food-storage',
    //   partialize: (state) => ({
    //     //  user: state.user 
    //     food: state.food
    //   }),
    // }
  )
);
