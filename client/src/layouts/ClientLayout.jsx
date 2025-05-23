import { Outlet, useLocation, Link } from "react-router-dom";
import { Home, ShoppingCart, ClipboardList, User } from "lucide-react";
import { cn } from "../lib/utils";

const ClientLayout = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/cart", label: "Cart", icon: ShoppingCart },
    { path: "/orders", label: "Orders", icon: ClipboardList },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-4 transition-all duration-200",
                location.pathname === item.path
                  ? "text-restaurant-softRed font-medium animate-scale-in"
                  : "text-gray-500"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-transform",
                location.pathname === item.path && "animate-bounce-small"
              )} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default ClientLayout;
