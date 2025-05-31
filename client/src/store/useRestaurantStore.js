/* eslint-disable no-unused-vars */
import { API_ROUTES } from '../utils/api';

import axios from 'axios';
import { state } from 'fs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: API_ROUTES.RESTAURANT,
  withCredentials: true,
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

      createRestaurant: async (
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post(`${API_ROUTES.RESTAURANT}/createRestaurant`, {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
          });
          set({ isLoading: false });
          return response.data.newRestaurant;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Restaurant creation failed'
              : 'Restaurant creation failed',
          });
          return null;
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
          const response = await axiosInstance.get(`${API_ROUTES.RESTAURANT}/getAllRestaurants`);
          console.log('GetAllRestaurants', response);
          // get({ isLoading: false, restaurants: response.data.restaurants });
          set({ isLoading: false, restaurants: response.data.restaurants });         // ✅ updating state   --> coz, we have to update the state everytime, when new restaurant comes in.
          return true;
        } catch (error) {
          get({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'No Restaurant available'
              : 'No Restaurant available',
          });
          return false;
        }
      },

      getRestaurantById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(`${API_ROUTES.RESTAURANT}/getRestaurantById/${id}`);
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


      updateRestaurant: async (
        id,
        {
          title,
          imageUrl,
          foods,
          time,
          pickup,
          delivery,
          isOpen,
          logoUrl,
          rating,
          ratingCount,
          code,
          coords,
        }
      ) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.put(
            `${API_ROUTES.RESTAURANT}/update/${id}`,
            {
              title,
              imageUrl,
              foods,
              time,
              pickup,
              delivery,
              isOpen,
              logoUrl,
              rating,
              ratingCount,
              code,
              coords,
            }
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
          return null;
        }
      },

      deleteRestaurantById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.delete(`${API_ROUTES.RESTAURANT}/deleteRestaurantById/${id}`);
          set({ isLoading: false });
          return response.data.restaurant; // optionally return deleted data

        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to delete restaurant'
              : 'Failed to delete restaurant',
          });
          return null
        }
      },
    }),
    // {
    //   name: 'restaurant-storage',
    //   partialize: (state) => ({
    //     // user: state.user,
    //     restaurants: state.restaurants,
    //   }),
    // }
  )
);
