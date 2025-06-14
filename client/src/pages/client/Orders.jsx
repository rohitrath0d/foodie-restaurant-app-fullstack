import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
// import { Order } from "@/types";
import { Phone, MessageSquare, Clock } from "lucide-react";

// Mock data
// const mockOrders: Order[] = [
const mockOrders = [
  {
    id: "1",
    userId: "1",
    restaurantId: "1",
    items: [
      {
        foodItemId: "1",
        quantity: 2,
        price: 9.99,
        name: "Classic Cheeseburger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
      },
      {
        foodItemId: "2",
        quantity: 1,
        price: 4.99,
        name: "French Fries",
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
      }
    ],
    status: "on-the-way",
    total: 24.97,
    paymentMethod: "card",
    createdAt: "2023-05-18T14:30:00Z",
    updatedAt: "2023-05-18T14:45:00Z",
    estimatedDeliveryTime: "15:30",
  },
  {
    id: "2",
    userId: "1",
    restaurantId: "3",
    items: [
      {
        foodItemId: "3",
        quantity: 2,
        price: 12.99,
        name: "California Roll",
        image: "https://images.unsplash.com/photo-1583623025817-d180a2fe075e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
      },
      {
        foodItemId: "4",
        quantity: 1,
        price: 8.99,
        name: "Miso Soup",
        image: "https://images.unsplash.com/photo-1607301406250-86aaaf8d0f9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
      }
    ],
    status: "delivered",
    total: 34.97,
    paymentMethod: "cash",
    createdAt: "2023-05-17T19:20:00Z",
    updatedAt: "2023-05-17T20:15:00Z",
    estimatedDeliveryTime: "20:15",
  },
  {
    id: "3",
    userId: "1",
    restaurantId: "2",
    items: [
      {
        foodItemId: "5",
        quantity: 1,
        price: 14.99,
        name: "Margherita Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
      }
    ],
    status: "preparing",
    total: 14.99,
    paymentMethod: "card",
    createdAt: "2023-05-18T12:10:00Z",
    updatedAt: "2023-05-18T12:20:00Z",
    estimatedDeliveryTime: "13:00",
  }
];

// const getStatusColor = (status: Order["status"]) => {
const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "preparing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "prepared":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "on-the-way":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// const getStatusPercentage = (status: Order["status"]) => {
const getStatusPercentage = (status) => {
  switch (status) {
    case "pending":
      return 20;
    case "preparing":
      return 40;
    case "prepared":
      return 60;
    case "on-the-way":
      return 80;
    case "delivered":
      return 100;
    default:
      return 0;
  }
};

// const formatDate = (dateString: string) => {
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState("active");
  
  const activeOrders = mockOrders.filter(order => 
    ["pending", "preparing", "prepared", "on-the-way"].includes(order.status)
  );
  
  const pastOrders = mockOrders.filter(order => 
    ["delivered", "cancelled"].includes(order.status)
  );

  return (
    <div className="container mx-auto max-w-3xl px-4 pt-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="past">Past Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No active orders</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastOrders.length > 0 ? (
            pastOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No past orders</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// const OrderCard = ({ order }: { order: Order }) => {
const OrderCard = ({ order }) => {
  const statusPercentage = getStatusPercentage(order.status);
  const statusColor = getStatusColor(order.status);
  
  return (
    <Card className="mb-6 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold">Order #{order.id}</h3>
            <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
          </div>
          <Badge className={statusColor}>
            {order.status.replace("-", " ").toUpperCase()}
          </Badge>
        </div>
        
        {["pending", "preparing", "prepared", "on-the-way"].includes(order.status) && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-restaurant-softRed h-full rounded-full transition-all duration-500" 
                style={{ width: `${statusPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Order Placed</span>
              <span>On the Way</span>
              <span>Delivered</span>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Clock size={14} className="text-gray-400 mr-1" />
              <span className="text-gray-500">
                Estimated delivery by {order.estimatedDeliveryTime}
              </span>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 object-cover rounded-md"
              />
              <div className="ml-3 flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Total</span>
            <span className="font-semibold">${order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment</span>
            <span className="capitalize">{order.paymentMethod}</span>
          </div>
          
          {["pending", "preparing", "prepared", "on-the-way"].includes(order.status) && (
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                <Phone size={14} />
                <span>Call</span>
              </Button>
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                <MessageSquare size={14} />
                <span>Message</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Orders;