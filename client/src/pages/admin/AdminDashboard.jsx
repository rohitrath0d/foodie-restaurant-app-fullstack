import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
// import { OrderSummary } from "@/types";

// const mockOrderSummary: OrderSummary = {
const mockOrderSummary = {
  totalOrders: 156,
  pendingOrders: 24,
  completedOrders: 132,
  revenue: 3845.67,
  averageRating: 4.7
};

const mockDailyData = [
  { day: "Mon", orders: 32, revenue: 648.25 },
  { day: "Tue", orders: 28, revenue: 542.30 },
  { day: "Wed", orders: 36, revenue: 720.15 },
  { day: "Thu", orders: 22, revenue: 435.50 },
  { day: "Fri", orders: 41, revenue: 825.80 },
  { day: "Sat", orders: 38, revenue: 756.40 },
  { day: "Sun", orders: 29, revenue: 580.60 }
];

const mockTopFoods = [
  { id: "1", name: "Classic Cheeseburger", quantity: 48, revenue: 479.52 },
  { id: "2", name: "Margherita Pizza", quantity: 32, revenue: 479.68 },
  { id: "3", name: "California Roll", quantity: 36, revenue: 467.64 },
  { id: "4", name: "Garden Salad", quantity: 24, revenue: 215.76 }
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">Welcome back, here's an overview of your restaurant performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Orders" 
          value={mockOrderSummary.totalOrders.toString()}
          description="All time orders"
        />
        <StatCard 
          title="Pending Orders" 
          value={mockOrderSummary.pendingOrders.toString()}
          description="Need attention"
          highlight
        />
        <StatCard 
          title="Revenue" 
          value={`$${mockOrderSummary.revenue.toFixed(2)}`}
          description="This month"
        />
        <StatCard 
          title="Average Rating" 
          value={mockOrderSummary.averageRating.toFixed(1)}
          description="Out of 5.0"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Daily Orders</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockDailyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  className="animate-fade-in"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#fff", 
                      border: "1px solid #e2e8f0", 
                      borderRadius: "8px" 
                    }} 
                  />
                  <Bar dataKey="orders" fill="#ea384c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Daily Revenue</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockDailyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  className="animate-fade-in"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#fff", 
                      border: "1px solid #e2e8f0", 
                      borderRadius: "8px" 
                    }}
                    formatter={(value) => [`$${value}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Items</CardTitle>
          <CardDescription>Most popular food items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Item</th>
                  <th className="text-center py-3 px-4">Quantity Sold</th>
                  <th className="text-right py-3 px-4">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {mockTopFoods.map((food) => (
                  <tr key={food.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{food.name}</td>
                    <td className="text-center py-3 px-4">{food.quantity}</td>
                    <td className="text-right py-3 px-4">${food.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// interface StatCardProps {
//   title: string;
//   value: string;
//   description: string;
//   highlight?: boolean;
// }

// const StatCard = ({ title, value, description, highlight = false }: StatCardProps) => (
const StatCard = ({ title, value, description, highlight = false }) => (
  <Card className={highlight ? "border-restaurant-softRed" : ""}>
    <CardContent className="p-6">
      <div className="space-y-2">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-3xl font-bold ${highlight ? "text-restaurant-softRed" : ""}`}>{value}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;