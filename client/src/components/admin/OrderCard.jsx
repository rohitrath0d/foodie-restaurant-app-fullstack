import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { format } from 'date-fns';

export const OrderCard = ({ order, isAdmin, onStatusChange }) => {
  const statusColors = {
    'preparing': 'bg-yellow-100 text-yellow-800',
    'prepared': 'bg-blue-100 text-blue-800',
    'on-the-way': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-green-100 text-green-800'
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleStatusUpdate = async (newStatus) => {
    await onStatusChange(order._id, newStatus);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">Order #{order._id.slice(-6).toUpperCase()}</h3>
          <p className="text-sm text-gray-500">
            {format(new Date(order.createdAt), 'MMM dd, yyyy hh:mm a')}
          </p>
        </div>
        <Badge className={statusColors[order.status]}>
          {order.status.replace('-', ' ')}
        </Badge>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Items:</h4>
        <ul className="space-y-2">
          {order.foods.map((food) => (
            <li key={food._id} className="flex justify-between">
              <span>{food.title}</span>
              <span>{formatPrice(food.price)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Customer:</p>
          <p>{order.buyer?.name || 'Unknown'}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total:</p>
          <p className="font-medium">{formatPrice(order.payment)}</p>
        </div>
      </div>

      {isAdmin && (
        <div className="mt-4 pt-4 border-t">
          <Select 
            value={order.status} 
            onValueChange={handleStatusUpdate}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="prepared">Prepared</SelectItem>
              <SelectItem value="on-the-way">On the way</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};