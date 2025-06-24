/* eslint-disable no-unused-vars */
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './useAuthStore';
import { API_ROUTES } from '../utils/api';

const cartAxios = axios.create({
  baseURL: API_ROUTES.CART,
  withCredentials: true,
});

// Interceptor to add token
cartAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isLoading: false,
      error: null,

      addToCart: async (foodId, quantity) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAxios.post('/addToCart', { foodId, quantity });
          set({ cart: response.data.cart, isLoading: false });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to add to cart'
              : 'Failed to add to cart',
          });
          return false;
        }
      },

      getCartByUser: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAxios.get('/getCartByUser');
          set({ cart: response.data.cart, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to fetch cart'
              : 'Failed to fetch cart',
          });
        }
      },

      // ✅ 3. updateCartItemController ⬌ updateCartItem(itemId, quantity)
      // ❌ Slight mismatch in naming: your backend expects foodId in req.body, while frontend is passing itemId in URL.
      // updateCartItem: async (itemId, quantity) => {
      updateCartItem: async (foodId, quantity) => {
        set({ isLoading: true, error: null });
        try {
          // const response = await cartAxios.put(`/updateCartItem/${itemId}`, { quantity });
          // const response = await cartAxios.put(`/updateCartItem/${foodId}}`, { quantity });
          const response = await cartAxios.put(`/updateCartItem`, { foodId, quantity });
          set({ cart: response.data.cart, isLoading: false });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to update cart item'
              : 'Failed to update cart item',
          });
          return false;
        }
      },

      // removeCartItem: async (itemId) => {
      removeCartItem: async (foodId) => {
        set({ isLoading: true, error: null });
        try {
          // const response = await cartAxios.delete(`/remove/${itemId}`);
          const response = await cartAxios.delete(`/removeCartItem/${foodId}`);
          set({ cart: response.data.cart, isLoading: false });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to remove item'
              : 'Failed to remove item',
          });
          return false;
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartAxios.delete('/clearCart');
          set({ cart: [], isLoading: false });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to clear cart'
              : 'Failed to clear cart',
          });
          return false;
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
