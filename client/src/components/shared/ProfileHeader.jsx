// import { User } from "@/types";
import { Bell, Settings } from "lucide-react";
import { Button } from "../../components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../../components/ui/dropdown-menu";

// interface ProfileHeaderProps {
//   user: User;
// }

// export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
export const ProfileHeader = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg mb-6">
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-restaurant-softRed"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="ml-3">
          <p className="font-medium text-sm">Welcome back,</p>
          <h2 className="font-bold">{user.name}</h2>
        </div>
      </div>
      
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative mr-2"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-restaurant-softRed rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};