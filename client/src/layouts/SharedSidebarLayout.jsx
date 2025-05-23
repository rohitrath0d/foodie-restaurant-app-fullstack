/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
} from "../components/ui/sidebar";
import { 
  Home, 
  ShoppingCart, 
  ClipboardList, 
  User, 
  ChevronRight, 
  Settings,
  LayoutDashboard,
  UtensilsCrossed
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';


// interface SidebarLayoutProps {
//   type: "client" | "admin";
// }

// const SharedSidebarLayout = ({ type }: SidebarLayoutProps) => {
const SharedSidebarLayout = ({ type }) => {
  const location = useLocation();
  
  const clientNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/cart", label: "Cart", icon: ShoppingCart },
    { path: "/orders", label: "Orders", icon: ClipboardList },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const adminNavItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/orders", label: "Orders", icon: ClipboardList },
    { path: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  ];

  const navItems = type === "client" ? clientNavItems : adminNavItems;

  const sidebarAnimation = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-r-navy/10">
          <SidebarHeader>
            <div className="p-4">
              <h2 className="text-2xl font-bold bg-coral-gradient text-transparent bg-clip-text">
                {type === "client" ? "Cozy Eats" : "Admin Panel"}
              </h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-coral font-medium">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="px-2">
                  <motion.div
                    variants={sidebarAnimation}
                    initial="hidden"
                    animate="show"
                  >
                    {navItems.map((item) => (
                      <motion.div key={item.path} variants={itemAnimation}>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            isActive={location.pathname === item.path}
                            tooltip={item.label}
                            asChild
                            className={cn(
                              "flex items-center w-full p-3 rounded-lg transition-colors",
                              location.pathname === item.path 
                                ? "bg-mint text-coral font-medium" 
                                : "hover:bg-mint/50 text-coral"
                            )}
                          >
                            <Link to={item.path} className="flex items-center w-full">
                              <item.icon className={cn(
                                "mr-2 h-5 w-5",
                                location.pathname === item.path && "text-coral"
                              )} />
                              <span>{item.label}</span>
                              {location.pathname === item.path && 
                                <ChevronRight className="ml-auto h-4 w-4 text-coral" />}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </motion.div>
                    ))}
                  </motion.div>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                © 2025 Cozy Eats
              </span>
              <ThemeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="bg-mint/10">
          <div className="p-4 md:p-6 flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4 text-coral hover:bg-mint rounded-full p-2" />
                <div className="text-lg font-semibold text-navy">
                  {type === "client" ? "Cozy Eats" : "Admin Dashboard"}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
              </div>
            </div>
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

// ✅ Add PropTypes for prop validation (optional but good practice)
SharedSidebarLayout.propTypes = {
  type: PropTypes.oneOf(["client", "admin"]).isRequired,
};



export default SharedSidebarLayout;
