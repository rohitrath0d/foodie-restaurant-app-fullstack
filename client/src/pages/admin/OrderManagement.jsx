import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useOrderStore from "../../store/useOrderStore";
import {OrderStatusBar} from "../../components/admin/OrderStatusBar";
import {OrderAnalytics} from "../../components/admin/OrderAnalytics";
import {CustomerManagement} from "../../components/admin/CustomerManagement";

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("allOrders");
  const { orders, isLoading } = useOrderStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Order Management</h1>
        <p className="text-gray-500">View and manage all customer orders</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-xl">
          <TabsTrigger value="allOrders">All Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="allOrders" className="space-y-6">
          <OrderStatusBar isAdmin={true} />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <OrderAnalytics orders={orders} isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-6">
          <CustomerManagement orders={orders} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderManagement;