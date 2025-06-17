/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useOrderStore from '@/store/useOrderStore';
import { useRestaurantStore } from '@/store/useRestaurantStore';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ErrorBoundary';



// export const OrderAnalytics = ({ orders, isLoading} = useOrderStore ) => {
export const OrderAnalytics = () => {

  const { orders = [], statusCounts, isLoading } = useRestaurantStore();

  // Mock data - replace with real analytics from your orders
  // const data = [
  //   { name: 'Mon', orders: 12 },
  //   { name: 'Tue', orders: 19 },
  //   { name: 'Wed', orders: 15 },
  //   { name: 'Thu', orders: 18 },
  //   { name: 'Fri', orders: 25 },
  //   { name: 'Sat', orders: 32 },
  //   { name: 'Sun', orders: 28 },
  // ];

  // Default status counts if not available
  // const counts = statusCounts || {
  //   pending: 0,
  //   preparing: 0,
  //   prepared: 0,
  //   ontheway: 0,
  //   delivered: 0
  // };


  // Prepare weekly data
  // const getWeeklyData = () => {
  const weeklyData = React.useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days.map(day => ({
      name: day,

      // orders: Math.floor(Math.random() * 20) + 5 // Replace with actual calculation

      // orders: orders.filter(order => {
      //   const orderDay = new Date(order.createdAt).getDay();
      //   return days[orderDay] === day;
      // }).length

      orders: Array.isArray(orders)
        ? orders.filter(order => {
          try {
            const orderDate = order?.createdAt ? new Date(order.createdAt) : null;
            if (!orderDate) return false;
            const orderDay = orderDate.getDay();
            return days[orderDay] === day;
          } catch (error) {
            console.error('Error processing order date:', error);
            return false;
          }
        }).length
        : 0

    }));
  }, [orders]);

  // if (isLoading) return <div className='text-center py-8'>Loading analytics...</div>;


  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2">Loading analytics...</p>
      </div>
    );
  }

  // Empty state
  if (!isLoading && orders.length === 0) {
    return (
      <div className="text-center py-8">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No order data available</h3>
        <p className="mt-1 text-gray-500">Get started by placing some orders.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Orders This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {/* <BarChart data={data}> */}
                {/* <BarChart data={getWeeklyData()}> */}
                {/* <BarChart data={weeklyData()}>    --> Error: WeeklyData is not a function */}
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>


            {/* <div className="space-y-2">
            <div className="flex justify-between">
              <span>Pending</span>
              <span>5</span>
            </div>
            <div className="flex justify-between">
              <span>Preparing</span>
              <span>3</span>
            </div>
            <div className="flex justify-between">
              <span>On the way</span>
              <span>2</span>
            </div>
            <div className="flex justify-between">
              <span>Delivered</span>
              <span>15</span>
            </div>
          </div> */}


            <div className="space-y-2">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex justify-between">
                  <span>

                    {status.charAt(0).toUpperCase() + status.slice(1)}

                    {/* {status === 'ontheway' ? 'On the way' 
                   : status.charAt(0).toUpperCase() + status.slice(1)} */}

                  </span>
                  <span>{count}</span>
                </div>
              ))}
            </div>


          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
};


OrderAnalytics.propTypes = {
  orders: PropTypes.array,
  statusCounts: PropTypes.object,
  isLoading: PropTypes.bool
};