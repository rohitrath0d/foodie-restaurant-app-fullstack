
// import { Restaurant } from "@/types";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import { MapPin, Clock, Star, Tag } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// interface RestaurantCardProps {
//   restaurant: Restaurant;
//   className?: string;
// }

// export const RestaurantCard = ({ restaurant, className }: RestaurantCardProps) => {
export const RestaurantCard = ({ restaurant, className }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={`overflow-hidden group card-hover ${className}`}>
        <div className="relative h-40 overflow-hidden">
          <img 
            src={restaurant.logo} 
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"></div>
          
          <Badge 
            className={`absolute top-3 right-3 ${
              restaurant.isOpen 
                ? "bg-coral text-white" 
                : "bg-navy/70 text-mint"
            } font-medium shadow-md`}
          >
            {restaurant.isOpen ? "Open Now" : "Closed"}
          </Badge>

          {restaurant.promotion && (
            <div className="absolute top-3 left-3 bg-mustard text-navy rounded-full px-3 py-1 text-xs font-semibold flex items-center shadow-md">
              <Tag size={12} className="mr-1" />
              {restaurant.promotion}
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-coral transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center bg-mint rounded-full px-2 py-1 text-navy font-medium text-xs">
              <Star size={14} className="text-mustard mr-1" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1 text-coral" />
            <span className="line-clamp-1">{restaurant.distance} • {restaurant.address}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-1 text-coral" />
            <span>Delivery: {restaurant.estimatedDeliveryTime} • Pickup: {restaurant.estimatedPickupTime}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 pt-1">
            {restaurant.cuisineType.map((type, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-1 text-xs bg-mint text-navy rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
