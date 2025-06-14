
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const OrderStatusTabs = ({
  pendingCount,
  preparingCount,
  preparedCount,
  onTheWayCount,
  deliveredCount,
  onStatusChange,
}) => {
  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={onStatusChange}>
      <TabsList className="grid grid-cols-6 mb-8">
        <TabsTrigger value="all">
          All
          <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
            {pendingCount + preparingCount + preparedCount + onTheWayCount + deliveredCount}
          </span>
        </TabsTrigger>
        <TabsTrigger value="pending">
          Pending
          <span className="ml-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
            {pendingCount}
          </span>
        </TabsTrigger>
        <TabsTrigger value="preparing">
          Preparing
          <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
            {preparingCount}
          </span>
        </TabsTrigger>
        <TabsTrigger value="prepared">
          Prepared
          <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
            {preparedCount}
          </span>
        </TabsTrigger>
        <TabsTrigger value="ontheway">
          On the way
          <span className="ml-2 bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
            {onTheWayCount}
          </span>
        </TabsTrigger>
        <TabsTrigger value="delivered">
          Delivered
          <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
            {deliveredCount}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
