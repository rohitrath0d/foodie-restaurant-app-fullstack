import { API_ROUTES } from '../utils/api';

import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './useAuthStore';

// const foodAxios = axios.create({
//   baseURL: API_ROUTES.FOOD,
//   withCredentials: true,
// });

// Axios instance setup
const restaurantAxios = axios.create({
  baseURL: API_ROUTES.RESTAURANT,
  withCredentials: true,
});


// Add auth interceptor to inject token
restaurantAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const useRestaurantStore = create(
  persist(
    (set, get) => ({
      // user: null,
      // Persisting user state (auth) and restaurant data can be done in separate stores with separate persist configs.
      // You do NOT have to include user inside the restaurant store persist unless you want the restaurant store itself to “know” about the user state.
      // Keep user state in your auth store and persist it there.
      // Do NOT include user inside restaurant store persist config unless you want them tightly coupled.
      // Just make sure in your UI logic or API calls, you check user from auth store to control access.

      isLoading: false,
      error: null,
      restaurants: [],        // restaurant []

      // createRestaurant: async (
      //   title,
      //   imageUrl,
      //   foods,
      //   time,
      //   pickup,
      //   delivery,
      //   isOpen,
      //   logoUrl,
      //   rating,
      //   ratingCount,
      //   code,
      //   coords,) => {
      createRestaurant: async (restaurantData) => {

        set({ isLoading: true, error: null });
        try {
          // const response = await restaurantAxios.post(`${API_ROUTES.RESTAURANT}/createRestaurant`, {
          // const response = await restaurantAxios.post(`/createRestaurant`, {
          //   title,
          //   imageUrl,
          //   foods,
          //   time,
          //   pickup,
          //   delivery,
          //   isOpen,
          //   logoUrl,
          //   rating,
          //   ratingCount,
          //   code,
          //   coords,
          // });
          const response = await restaurantAxios.post('/createRestaurant', restaurantData);
          // set({ isLoading: false });

          // Optionally add to local state immediately (optimistic update)
          set((state) => ({
            restaurants: [...state.restaurants, response.data.newRestaurant],
            isLoading: false
          }));
          return response.data.newRestaurant;

        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.message || 'Restaurant creation failed'
              : 'Restaurant creation failed',
          });
          // return null;
          throw error; // Important to re-throw for form handling
        }
      },

      // getAllRestaurants is meant to fetch data from the server and read it.
      // set({ isLoading: true, error: null });    ...    set({ isLoading: false, restaurants: response.data.restaurants });
      // That means you're not just reading — you're telling Zustand to update the isLoading, restaurants, and error values in global state.
      // so for Reading state -> get() -> why? to access current state.
      // so for Updating state -> set() -> why? To change isLoading, restaurants, etc.
      // So in summary: ✅ yes, you're "getting data" from the server — but you're also updating Zustand state, which is why you must use set().

      getAllRestaurants: async () => {
        // get({ isLoading: true, error: null });
        set({ isLoading: true, error: null });         // ✅ setting loading state
        try {
          // const response = await restaurantAxios.get(`${API_ROUTES.RESTAURANT}/getAllRestaurants`);
          const response = await restaurantAxios.get(`/getAllRestaurants`);
          console.log('GetAllRestaurants', response.data);       // Verify _id exists
          // get({ isLoading: false, restaurants: response.data.restaurants });
          set({
            isLoading: false,
            restaurants: response.data.restaurants
          });         // ✅ updating state   --> coz, we have to update the state everytime, when new restaurant comes in.
          // return true;
          return response.data.restaurants;
        } catch (error) {
          get({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'No Restaurant available'
              : 'No Restaurant available',
          });
          // return false;
          // throw error;
          return [];      // Return empty array on error
        }
      },

      getRestaurantById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // const response = await restaurantAxios.get(`${API_ROUTES.RESTAURANT}/getRestaurantById/${id}`);
          const response = await restaurantAxios.get(`/getRestaurantById/${id}`);
          set({ isLoading: false });
          return response.data.restaurant; // return the restaurant to use in frontend
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to fetch restaurant'
              : 'Failed to fetch restaurant',
          });
          return null;
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



      // Either change frontend:
      // await restaurantAxios.put(`/updateRestaurantById/${restaurantId}`, ...);
      // Or change backend route:
      // router.put("/update/:id", ...);

      // MongoDB uses _id by default for document identifiers
      // Your backend controller expects to receive this _id in the URL parameter
      // The mismatch in property names (restaurantId vs _id) was causing the ID to be undefined during updates
      // With no ID, your backend likely treats it as a create operation

      updateRestaurant: async (
        id,
        // restaurantId,
        // {
        //   title,
        //   imageUrl,
        //   foods,
        //   time,
        //   pickup,
        //   delivery,
        //   isOpen,
        //   logoUrl,
        //   rating,
        //   ratingCount,
        //   code,
        //   coords,
        // }
        data
      ) => {
        set({ isLoading: true, error: null });
        try {
          // Convert string 'true'/'false' to boolean
          const payload = {
            ...data,
            delivery: data.delivery === 'true' || data.delivery === true,
            pickup: data.pickup === 'true' || data.pickup === true
          };

          const response = await restaurantAxios.put(
            // `${API_ROUTES.RESTAURANT}/update/${id}`,
            `/updateRestaurantById/${id}`,      // i am calling update, but on the backend it is called updateRestaurantById
            // `/update/${restaurantId}`,
            // {
            //   title,
            //   imageUrl,
            //   foods,
            //   time,
            //   pickup,
            //   delivery,
            //   isOpen,
            //   logoUrl,
            //   rating,
            //   ratingCount,
            //   code,
            //   coords,
            // }
            payload   // Pass the complete data object, no need to destructure it completely.
          );
          set({ isLoading: false });

          return response.data.updatedRestaurant; // 🟢 use this in your UI after update
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to update restaurant'
              : 'Failed to update restaurant',
          });
          // return null;
          throw error  // Re-throw for component handling
        }
      },

      deleteRestaurantById: async (
        id,
        // restaurantId,
      ) => {
        set({ isLoading: true, error: null });
        try {
          if (!id) {
            throw new Error("No restaurant ID provided");
          }

          // const response = await restaurantAxios.delete(`${API_ROUTES.RESTAURANT}/deleteRestaurantById/${id}`);
          const response = await restaurantAxios.delete(`/deleteRestaurantById/${id}`);
          // const response = await restaurantAxios.delete(`/deleteRestaurantById/${restaurantId}`);
          set({ isLoading: false });
          return response.data.restaurant; // optionally return deleted data

        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.message || 'Failed to delete restaurant'
              : 'Failed to delete restaurant',
          });
          // return null
          throw error  // Re-throw for component handling
        }
      },
    }),
    {
      name: 'restaurant-storage',
      partialize: (state) => ({
        // user: state.user,
        restaurants: state.restaurants,
      }),
    }
  )
);
