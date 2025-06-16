/* eslint-disable no-unused-vars */
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
// import {useAuthStore} from "../store/useAuthStore"
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react"
import { Home, ClipboardList, BookOpen, Settings, HandPlatter, ChevronRight, LogOut, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { toast } from "../components/ui/sonner"



const AdminLayout = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { user, login, logout } = useAuthStore();

  // Fetch admin data if not in store
  // const { data: admin } = useQuery({
  //   queryKey: ['admin'],
  //   queryFn: async () => {
  //     const response = await axios.get('/api/v1/auth');
  //     return response.data;
  //   },
  //   enabled: !user, // Only fetch if user not in store
  // });

  // useEffect(() => {
  //   if (admin) {
  //     setUser(admin);
  //   }
  // }, [admin, setUser]);

  // Verify admin role and authentication
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        // Check if user is logged in and is admin (not superadmin)
        // if (!user || user.usertype !== 'admin') {
        if (!user || user.usertype !== 'admin') {
          navigate('/login');
          return;
        }

        // Optional: Verify session with backend
        // await axios.get(API_ENDPOINTS.GET_CURRENT_ADMIN, {
        //   validateStatus: (status) => status === 200
        // });

        // here, we can do check from backend at API_ROUTES.AUTH/user

      } catch (error) {
        logout();
        navigate('/login');
        toast.error("Session expired. Please login again.");
      }
    };

    verifyAdmin();
  }, [user, navigate, logout]);

  const handleLogout = async () => {
    try {
      // await axios.post(API_ENDPOINTS.LOGOUT);      // no need to do this, coz already setted up helper function for this in useAuthStore.js    
      await logout();       // Uses the store's logout function

      // Additional client-side cleanup
      navigate('/login');
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  const navItems = [
    { path: "/admin/restaurant-management", label: "Manage Restaurants", icon: HandPlatter },
    { path: "/admin/menu-management", label: "Manage Menu", icon: BookOpen },
    { path: "/admin/orders", label: "Orders", icon: ClipboardList },
    { path: "/admin/settings", label: "Settings", icon: Settings },
    { path: "/admin/dashboard", label: "Dashboard", icon: Home },

  ];

  // const mockAdmin = {
  //   name: "John Doe",
  //   role: "Restaurant Manager",
  //   avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  // };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="relative w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-restaurant-softRed">Foodie Admin</h2>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-6 py-3 transition-colors",
                location.pathname === item.path
                  ? "bg-restaurant-cream text-restaurant-softRed border-l-4 border-restaurant-softRed"
                  : "text-gray-600 hover:bg-restaurant-beige"
              )}
            >
              <item.icon size={20} className="mr-3" />
              <span>{item.label}</span>
              {location.pathname === item.path && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          ))}
        </nav>
        {/* <div className="absolute bottom-0 left-0 right-0 p-6"> */}
        <div className="absolute bottom-0 p-6 w-full">
          <div className="flex items-center mb-4">
            {/* <img src={mockAdmin.avatar} alt="Admin" className="w-10 h-10 rounded-full mr-3" /> */}
            <img src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="Admin" className="w-10 h-10 rounded-full mr-3" />
            <div>
              {/* <p className="font-medium">{mockAdmin.name}</p> */}
              <p className="font-medium">{user.userName}</p>
              {/* <p className="text-xs text-gray-500">{mockAdmin.role}</p> */}
              <p className="text-xs text-gray-500">{user.usertype === 'superadmin' ? 'Super Admin' : 'Admin'}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center text-white  bg-coral"
            onClick={handleLogout}
          >
            <LogOut 
              size={16} 
              className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden bg-white w-full fixed top-0 left-0 right-0 z-20 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-restaurant-softRed">FoodieAdmin</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  {/* <img src={mockAdmin.avatar} alt="Admin" className="w-8 h-8 rounded-full" /> */}
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                    alt="Admin"
                    className="w-8 h-8 rounded-full"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {/* <p>{mockAdmin.name}</p> */}
                <p>{user.userName}</p>
                {/* <p className="text-xs text-gray-500">{mockAdmin.role}</p> */}
                <p className="text-xs text-gray-500">{user.usertype === 'superadmin' ? 'Super Admin' : 'Admin'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 md:ml-0 mt-16 md:mt-0">
        <Outlet />
      </main>

      {/* Mobile navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10 md:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-4",
                location.pathname === item.path
                  ? "text-restaurant-softRed font-medium"
                  : "text-gray-500"
              )}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AdminLayout;