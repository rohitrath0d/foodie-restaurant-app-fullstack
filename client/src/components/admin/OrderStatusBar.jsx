/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React from 'react';
// import { OrderStatusTabs } from './OrderStatusTabs';
// import { useOrderStore } from '../../store/useOrderStore';
// import { useEffect } from 'react';
// import { toast } from '../ui/sonner';
// import OrderCard from './OrderCard';

// // export const OrderStatusBar = ({ isAdmin = false }) => {
// export const OrderStatusBar = ({ isAdmin = true }) => {
//   const { 
//     orders, 
//     getAllOrders, 
//     getUserOrders, 
//     updateOrderStatus,
//     isLoading,
//     error 
//   } = useOrderStore();

//   // Count orders by status
//   const orderCounts = {
//     pending: orders.filter(order => !order.status || order.status === 'preparing').length,
//     preparing: orders.filter(order => order.status === 'preparing').length,
//     prepared: orders.filter(order => order.status === 'prepared').length,
//     ontheway: orders.filter(order => order.status === 'on-the-way').length,
//     delivered: orders.filter(order => order.status === 'delivered').length,
//   };

//   // Load orders based on user role
//   useEffect(() => {
//     const loadOrders = async () => {
//       try {
//         if (isAdmin) {
//           await getAllOrders();
//         } else {
//           await getUserOrders();
//         }
//       } catch (err) {
//         toast.error("Failed to load orders");
//       }
//     };

//     loadOrders();
//   }, [isAdmin, getAllOrders, getUserOrders]);

//   // Handle status change (for admin)
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const success = await updateOrderStatus(orderId, newStatus);
//       if (success) {
//         toast.success(`Order status updated to ${newStatus}`);
//       }
//     } catch (error) {
//       toast.error("Failed to update order status");
//     }
//   };

//   // Filter orders by status
//   const filterOrdersByStatus = (status) => {
//     switch (status) {
//       case 'pending':
//         return orders.filter(order => !order.status || order.status === 'preparing');
//       case 'preparing':
//         return orders.filter(order => order.status === 'preparing');
//       case 'prepared':
//         return orders.filter(order => order.status === 'prepared');
//       case 'ontheway':
//         return orders.filter(order => order.status === 'on-the-way');
//       case 'delivered':
//         return orders.filter(order => order.status === 'delivered');
//       default:
//         return orders;
//     }
//   };

//   // State for current tab
//   const [currentStatus, setCurrentStatus] = React.useState('all');

//   const handleTabChange = (status) => {
//     setCurrentStatus(status);
//   };

//   return (
//     <div className="space-y-6">
//       <OrderStatusTabs
//         pendingCount={orderCounts.pending}
//         preparingCount={orderCounts.preparing}
//         preparedCount={orderCounts.prepared}
//         onTheWayCount={orderCounts.ontheway}
//         deliveredCount={orderCounts.delivered}
//         onStatusChange={handleTabChange}
//       />

//       {isLoading ? (
//         <div className="flex justify-center py-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//         </div>
//       ) : error ? (
//         <div className="text-center py-8 text-red-500">
//           {error}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {filterOrdersByStatus(currentStatus).map((order) => (
//             <OrderCard 
//               key={order._id}
//               order={order}
//               isAdmin={isAdmin}
//               onStatusChange={handleStatusChange}
//             />
//           ))}
//         </div>
//       )}

//       {!isLoading && filterOrdersByStatus(currentStatus).length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           No orders found in this status
//         </div>
//       )}
//     </div>
//   );
// };











import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from 'date-fns';
import useOrderStore from '@/store/useOrderStore';

// export const OrderStatusBar = ({ isAdmin = false }) => {
export const OrderStatusBar = ({ isAdmin = true }) => {

  const {
    orders,
    statusCounts,
    getAllOrders,
    updateOrderStatus,
    isLoading,
    error
  } = useOrderStore();

  const [activeStatus, setActiveStatus] = useState('all');

  // Fetch orders on component mount
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);


  // Mock data - replace with real data from your store
  // const orders = [
  //   {
  //     id: '1001',
  //     date: new Date('2023-05-18T20:00:00'),
  //     items: [
  //       { name: 'Classic Cheeseburger', quantity: 2, price: 9.99 },
  //       { name: 'French Fries', quantity: 1, price: 4.99 }
  //     ],
  //     status: 'preparing',
  //     customer: {
  //       name: 'Michael Johnson',
  //       distance: '1.2 miles away',
  //       deliveryEstimate: '15:30'
  //     },
  //     paymentMethod: 'Credit Card'
  //   },
  //   {
  //     id: '1002',
  //     date: new Date('2023-05-18T19:45:00'),
  //     items: [
  //       { name: 'Veggie Pizza', quantity: 1, price: 12.99 },
  //       { name: 'Garlic Bread', quantity: 1, price: 5.99 }
  //     ],
  //     status: 'prepared',
  //     customer: {
  //       name: 'Sarah Williams',
  //       distance: '0.8 miles away',
  //       deliveryEstimate: '15:15'
  //     },
  //     paymentMethod: 'PayPal'
  //   }
  // ];

  const filteredOrders = activeStatus === 'all'
    ? orders
    : activeStatus === 'pending'
      ? orders.filter(order => !order.status || order.status === 'preparing')
      : orders.filter(order => !order.status === activeStatus);

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    await getAllOrders(); // Refresh the orders list
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const statusTabs = [
    { value: 'all', label: 'All', count: 5 },
    { value: 'pending', label: 'Pending', count: 1 },
    { value: 'preparing', label: 'Preparing', count: 1 },
    { value: 'prepared', label: 'Prepared', count: 1 },
    { value: 'on-the-way', label: 'On the way', count: 1 },
    { value: 'delivered', label: 'Delivered', count: 1 }
  ];

  // const calculateTotal = (items) => {
  //   return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  // };
  const calculateTotal = (food) => {
    return food.reduce((total, food) => total + (food.price * food.quantity), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto pb-2 space-x-2">
        {statusTabs.map((tab) => (
          <Button
            key={tab.value}
            variant={activeStatus === tab.value ? 'default' : 'outline'}
            onClick={() => setActiveStatus(tab.value)}
            className="flex items-center space-x-2"
          >
            <span>{tab.label}</span>
            <Badge variant="secondary">{tab.count}</Badge>
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          // <Card key={order.id}>
          <Card key={order._id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                {/* <CardTitle>Order #{order.id}</CardTitle> */}
                <CardTitle>Order #{order._id.slice(-6).toUpperCase()}</CardTitle>
                <Badge variant="outline">
                  {/* {format(order.date, 'MM/dd/yyyy, h:mm a')} */}
                  {format(new Date(order.createdAt), 'MM/dd/yyyy, h:mm a')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-2">
                    {/* {order.items.map((item, index) => ( */}
                    {order.foods.map((food) => (
                      // <div key={index} className="flex justify-between">
                      <div key={food._id} className="flex justify-between">
                        {/* <span>{item.name}</span> */}
                        <span>{food.title}</span>
                        <span>
                          {/* {item.quantity} x {formatPrice(item.price)} */}
                          {formatPrice(food.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    {/* <span>{formatPrice(calculateTotal(order.items))}</span> */}
                    <span>{formatPrice(order.payment)}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Payment Method: {order.paymentMethod || 'Not Specified'}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Customer</h3>
                  <div className="space-y-1">
                    {/* <div>{order.customer.name}</div> */}
                    <div>{order.buyer?.name || "Unknown"}</div>
                    <div className="text-sm text-gray-500">
                      {/* {order.customer.distance} */}
                      {order.buyer?.email || ''}
                    </div>

                    {/* <div className="text-sm text-gray-500">
                      Estimated delivery by {order.customer.deliveryEstimate}
                    </div> */}

                  </div>
                </div>

                {isAdmin && (
                  <div className="border-t pt-4">
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusUpdate(order._id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="prepared">Prepared</SelectItem>
                        <SelectItem value="on-the-way">On the way</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusBar;