/* eslint-disable no-unused-vars */

// import { Restaurant } from "@/types";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import { MapPin, Clock, Star, Tag } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "../../components/ui/sonner";
import {useRestaurantStore} from "../../store/useRestaurantStore";
import { useEffect, useState } from "react";

// interface RestaurantCardProps {
//   restaurant: Restaurant;
//   className?: string;
// }

// export const RestaurantCard = ({ restaurant, className }: RestaurantCardProps) => {
// export const RestaurantCard = ({ restaurantId, className }) => {
export const RestaurantCard = ({ restaurant, className }) => {

  // const [restaurant, setRestaurant] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const { getRestaurantById } = useRestaurantStore();
  const { getAllRestaurants } = useRestaurantStore();


  // useEffect(() => {
  //   const fetchRestaurantData = async () => {
  //     try {
  //       setLoading(true);
  //       const restaurantData = await getRestaurantById(restaurantId);
  //       if (restaurantData) {
  //         setRestaurant(restaurantData);
  //       } else {
  //         throw new Error('Restaurant not found');
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //       toast.error("Failed to load restaurant details");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (restaurantId) {
  //     fetchRestaurantData();
  //   }
  // }, [restaurantId, getRestaurantById]);



  
  if (!restaurant) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <div className="p-4 text-center text-red-500">
          No restaurant data provided
        </div>
      </Card>
    );
  }


  // if (loading) {
  //   return (
  //     <Card className={`overflow-hidden ${className}`}>
  //       <div className="relative h-40 overflow-hidden bg-gray-200 animate-pulse"></div>
  //       <div className="p-4 space-y-3">
  //         <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
  //         <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
  //         <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
  //         <div className="flex flex-wrap gap-1 pt-1">
  //           <span className="inline-block px-2 py-1 bg-gray-200 rounded-full w-16 h-6"></span>
  //           <span className="inline-block px-2 py-1 bg-gray-200 rounded-full w-16 h-6"></span>
  //         </div>
  //       </div>
  //     </Card>
  //   );
  // }


  // if (error || !restaurant) {
  //   return (
  //     <Card className={`overflow-hidden ${className}`}>
  //       <div className="p-4 text-center text-red-500">
  //         Failed to load restaurant
  //       </div>
  //     </Card>
  //   );
  // }

  // Transform backend data to match frontend expectations
  const formattedRestaurant = {
    ...restaurant,
    logo: restaurant.logoUrl || '/restaurant-placeholder.jpg',
    name: restaurant.title,
    isOpen: restaurant.isOpen,
    distance: restaurant.coords?.address ? `${Math.floor(Math.random() * 5) + 1} km` : 'N/A',
    address: restaurant.coords?.address || 'Address not available',
    estimatedDeliveryTime: restaurant.time || '30-40 min',
    estimatedPickupTime: restaurant.pickup ? '15-20 min' : 'Not available',
    cuisineType: restaurant.foods?.map(food => food?.category || 'Food') || ['Various'],
    promotion: restaurant.code ? `Promo: ${restaurant.code}` : null
  };


  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={`overflow-hidden group card-hover ${className}`}>
        <div className="relative h-40 overflow-hidden">
          <img
            // src={restaurant.logo} 
            src={formattedRestaurant.logo}
            // alt={restaurant.name}
            alt={formattedRestaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"></div>

          <Badge
            className={`absolute top-3 right-3 ${restaurant.isOpen
                ? "bg-coral text-white"
                : "bg-navy/70 text-mint"
              } font-medium shadow-md`}
          >
            {restaurant.isOpen ? "Open Now" : "Closed"}
          </Badge>

          {/* {restaurant.promotion && ( */}
          {formattedRestaurant.promotion && (
            <div className="absolute top-3 left-3 bg-mustard text-navy rounded-full px-3 py-1 text-xs font-semibold flex items-center shadow-md">
              <Tag size={12} className="mr-1" />
              {/* {restaurant.promotion} */}
              {formattedRestaurant.promotion}
            </div>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-coral transition-colors">
              {/* {restaurant.name} */}
              {formattedRestaurant.name}
            </h3>
            <div className="flex items-center bg-mint rounded-full px-2 py-1 text-navy font-medium text-xs">
              <Star size={14} className="text-mustard mr-1" />
              {/* <span>{restaurant.rating.toFixed(1)}</span> */}
              <span>{formattedRestaurant.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1 text-coral" />
            {/* <span className="line-clamp-1">{restaurant.distance} • {restaurant.address}</span> */}
            <span className="line-clamp-1">{formattedRestaurant.distance} • {formattedRestaurant.address}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-1 text-coral" />
            <span className="line-clamp-1">Delivery: {restaurant.estimatedDeliveryTime} • Pickup: {restaurant.estimatedPickupTime}</span>
          </div>

          <div className="flex flex-wrap gap-1 pt-1">
            {/* {restaurant.cuisineType.map((type, index) => ( */}
            {formattedRestaurant.cuisineType.map((type, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-mint text-navy rounded-full"
              >
                {type}
              </span>
            ))}
            {formattedRestaurant.cuisineType.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-mint text-navy rounded-full">
                +{formattedRestaurant.cuisineType.length - 3}
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
