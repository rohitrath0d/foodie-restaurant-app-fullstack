/* eslint-disable no-unused-vars */
import { API_ROUTES } from '../utils/api';
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './useAuthStore';

// Axios instance for orders
const orderAxios = axios.create({
  baseURL: API_ROUTES.ORDERS,
  withCredentials: true,
});

// Add auth interceptor to inject token
orderAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      statusCounts: {
        pending: 0,
        preparing: 0,
        prepared: 0,
        ontheway: 0,
        delivered: 0
      },

      isLoading: false,
      error: null,
      

      // Place a new order
      placeOrder: async (cart) => {
        if (!cart || cart.length === 0) {
          set({
            error: 'Please add items to cart before placing order',
            isLoading: false
          });
          return false;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await orderAxios.post('/placeOrder', { cart });
          set((state) => ({
            orders: [...state.orders, response.data.newOrder],
            isLoading: false
          }));
          return response.data.newOrder;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.message || 'Order placement failed'
              : 'Order placement failed',
          });
          return false;
        }
      },

      // Get all orders (admin only)
      getAllOrders: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await orderAxios.get('/getAllOrders');
          const orders = response.data.orders;

           // Calculate status counts
          const counts = {
            pending: orders.filter(o => !o.status || o.status === 'preparing').length,
            preparing: orders.filter(o => o.status === 'preparing').length,
            prepared: orders.filter(o => o.status === 'prepared').length,
            ontheway: orders.filter(o => o.status === 'on-the-way').length,
            delivered: orders.filter(o => o.status === 'delivered').length
          };

          set({
            orders: response.data.orders,
            statusCounts: counts,
            isLoading: false
          });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to fetch orders'
              : 'Failed to fetch orders',
          });
          return false;
        }
      },

      // Get user's orders
      getUserOrders: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await orderAxios.get('/user-orders');
          set({
            orders: response.data.orders,
            isLoading: false
          });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to fetch your orders'
              : 'Failed to fetch your orders',
          });
          return false;
        }
      },

      // Update order status (admin only)
      updateOrderStatus: async (orderId, status) => {
        if (!orderId || !status) {
          set({
            error: 'Order ID and status are required',
            isLoading: false
          });
          return false;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await orderAxios.post(`/orderStatus/${orderId}`, { status });
          set((state) => ({
            orders: state.orders.map(order =>
              order._id === orderId ? response.data.updatedOrder : order
            ),
            isLoading: false
          }));
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to update order status'
              : 'Failed to update order status',
          });
          return false;
        }
      },

      // Get order by ID
      getOrderById: async (orderId) => {
        if (!orderId) {
          set({ error: 'Order ID is required' });
          return null;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await orderAxios.get(`/getOrderById/${orderId}`);
          set({ isLoading: false });
          return response.data.order;
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || 'Failed to fetch order details'
              : 'Failed to fetch order details',
          });
          return null;
        }
      },

      // Clear orders from state
      clearOrders: () => {
        set({ orders: [] });
      },

      // Clear errors
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'order-storage',
      partialize: (state) => ({
        orders: state.orders
      }),
    }
  )
);

export default useOrderStore;