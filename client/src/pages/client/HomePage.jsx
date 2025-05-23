/* eslint-disable no-unused-vars */
// import React from 'react'

// function HomePage() {
//   return (
//     <div>HomePage</div>
//   )
// }

// export default HomePage



import { useState, useEffect } from "react";
import { RestaurantCard } from "@/components/shared/RestaurantCard";
import { FoodCard } from "@/components/shared/FoodCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, ArrowRight, Clock, Utensils, Tag, Star } from "lucide-react";
// import { Restaurant, FoodItem, FoodTag } from "@/types";
import { motion } from "framer-motion";

// Sample food tags for our food items
const foodTags= [
  { id: "1", name: "Vegetarian", color: "#4CAF50" },
  { id: "2", name: "Spicy", color: "#FF5722" },
  { id: "3", name: "Gluten Free", color: "#9C27B0" },
  { id: "4", name: "Organic", color: "#8BC34A" },
  { id: "5", name: "Seafood", color: "#03A9F4" },
  { id: "6", name: "Dessert", color: "#E91E63" },
];

// Sample restaurant data
const sampleRestaurants= [
  {
    id: "1",
    name: "Pasta Paradise",
    logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    rating: 4.5,
    distance: "1.2 miles",
    estimatedDeliveryTime: "20-30 min",
    estimatedPickupTime: "10-15 min",
    address: "123 Main St",
    isOpen: true,
    cuisineType: ["Italian", "Pasta"],
    promotion: "20% Off First Order"
  },
  {
    id: "2",
    name: "Sushi Sensation",
    logo: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.7,
    distance: "0.8 miles",
    estimatedDeliveryTime: "25-35 min",
    estimatedPickupTime: "15-20 min",
    address: "456 Sushi Ave",
    isOpen: true,
    cuisineType: ["Japanese", "Sushi", "Asian"]
  },
  {
    id: "3",
    name: "Burgers & Bites",
    logo: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80",
    rating: 4.3,
    distance: "1.5 miles",
    estimatedDeliveryTime: "15-25 min",
    estimatedPickupTime: "10-15 min",
    address: "789 Burger St",
    isOpen: false,
    cuisineType: ["American", "Burgers", "Fast Food"],
    promotion: "Free Fries with Burger"
  }
];

// Sample food data
const sampleFoods = [
  {
    id: "1",
    title: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    price: 12.99,
    description: "Classic Italian pizza with tomato sauce, mozzarella, and fresh basil. Made with our homemade dough and baked in a wood-fired oven.",
    rating: 4.6,
    available: true,
    preparationTime: "15-20 min",
    foodTags: [
      foodTags[0], // Vegetarian
      { id: "7", name: "Italian", color: "#FF9800" }
    ],
    hasCoupon: true,
    couponCode: "PIZZA10",
    couponDiscount: 10
  },
  {
    id: "2",
    title: "Chicken Alfredo Pasta",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023882a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: 15.99,
    description: "Creamy Alfredo sauce with grilled chicken breast served over fettuccine pasta. Garnished with parmesan cheese and parsley.",
    rating: 4.4,
    available: true,
    preparationTime: "20-25 min",
    foodTags: [
      { id: "7", name: "Italian", color: "#FF9800" },
      { id: "8", name: "Pasta", color: "#795548" }
    ],
    hasCoupon: false,
    couponCode: "",
    couponDiscount: 0
  },
  {
    id: "3",
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1603046891744-76176c4d1aba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1371&q=80",
    price: 9.99,
    description: "Freshly smashed avocado on artisan sourdough toast, topped with cherry tomatoes, feta cheese, and microgreens. Drizzled with extra virgin olive oil and lemon juice.",
    rating: 4.8,
    available: true,
    preparationTime: "10-15 min",
    foodTags: [
      foodTags[0], // Vegetarian
      foodTags[3], // Organic
      { id: "9", name: "Breakfast", color: "#FFC107" }
    ],
    hasCoupon: true,
    couponCode: "HEALTHY15",
    couponDiscount: 15
  }
];

const Home = () => {
  const [location, setLocation] = useState("New York, NY");
  const [restaurants, setRestaurants] = useState([]);
  const [popularFoods, setPopularFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setRestaurants(sampleRestaurants);
      setPopularFoods(sampleFoods);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const categoryButtons = [
    { id: "all", label: "All", icon: <Utensils size={16} /> },
    { id: "favorites", label: "Favorites", icon: <Star size={16} /> },
    { id: "nearby", label: "Nearby", icon: <MapPin size={16} /> },
    { id: "offers", label: "Special Offers", icon: <Tag size={16} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div 
        className="mb-8 hero-gradient rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" className="text-coral" d="M47.7,-67.5C62.8,-59.9,76.8,-47,83.5,-30.8C90.2,-14.6,89.6,4.9,83.4,22.1C77.2,39.3,65.3,54.1,50.3,64C35.2,73.9,17.6,78.8,0.2,78.5C-17.1,78.2,-34.3,72.7,-48.6,62.4C-62.9,52.2,-74.3,37.1,-79.4,20.1C-84.4,3.1,-83,-15.8,-74.8,-30.4C-66.5,-45,-51.4,-55.5,-36.5,-63C-21.7,-70.6,-7.1,-75.3,7.3,-75.8C21.7,-76.4,32.6,-75.1,47.7,-67.5Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover and Order <span className="text-coral">Delicious Food</span>
          </motion.h1>
          <motion.p 
            className="text-foreground/70 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            From local favorites to culinary adventures, get it delivered with just a few taps.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="relative flex-grow">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                type="text" 
                placeholder="Your delivery address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 bg-[#f4fdfb]/50 dark:bg-[#f4fdfb]/20 border-none shadow-sm rounded-full h-12"
              />
            </div>
            
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                type="text" 
                placeholder="Search for food or restaurants"
                className="pl-10 bg-[#f4fdfb]/50 dark:bg-[#f4fdfb]/20 border-none shadow-sm rounded-full h-12"
              />
            </div>
            
            <Button className="bg-coral hover:bg-coral/90 text-white rounded-full px-6 h-12">
              Search
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Category Buttons */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {categoryButtons.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-full flex items-center gap-2 h-11 px-5 ${
                activeCategory === category.id 
                  ? "bg-coral hover:bg-coral/90 text-white" 
                  : "border hover:bg-accent/10"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              {category.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Featured Carousel */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Featured Offers</h2>
          <Button variant="ghost" className="flex items-center gap-1 text-coral">
            View all <ArrowRight size={16} />
          </Button>
        </div>
        
        <div className="overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-4" style={{ minWidth: "max-content" }}>
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="w-72 h-36 overflow-hidden shimmer">
                  <div className="h-full"></div>
                </Card>
              ))
            ) : (
              <>
                <Card className="w-72 h-36 overflow-hidden border-0 shadow-md">
                  <div className="h-full relative bg-gradient-to-r from-coral to-coral/80 p-5 text-white">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full"></div>
                    <div className="absolute right-4 -bottom-5 w-16 h-16 bg-white/30 rounded-full"></div>
                    <div className="relative z-10">
                      <Badge className="bg-white text-coral mb-2">New Users</Badge>
                      <h3 className="text-xl font-bold mb-1">50% OFF First Order</h3>
                      <p className="text-sm opacity-90">Use code: WELCOME50</p>
                    </div>
                  </div>
                </Card>
                <Card className="w-72 h-36 overflow-hidden border-0 shadow-md">
                  <div className="h-full relative bg-gradient-to-r from-mustard to-mustard/80 p-5 text-navy">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-navy/10 rounded-full"></div>
                    <div className="absolute right-4 -bottom-5 w-16 h-16 bg-navy/20 rounded-full"></div>
                    <div className="relative z-10">
                      <Badge className="bg-navy text-white mb-2">Free Delivery</Badge>
                      <h3 className="text-xl font-bold mb-1">Orders Over $25</h3>
                      <p className="text-sm opacity-90">Valid this weekend</p>
                    </div>
                  </div>
                </Card>
                <Card className="w-72 h-36 overflow-hidden border-0 shadow-md">
                  <div className="h-full relative bg-gradient-to-r from-navy to-navy-light p-5 text-white">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="absolute right-4 -bottom-5 w-16 h-16 bg-white/20 rounded-full"></div>
                    <div className="relative z-10">
                      <Badge className="bg-mint text-navy mb-2">Limited Time</Badge>
                      <h3 className="text-xl font-bold mb-1">Buy 1 Get 1 Free</h3>
                      <p className="text-sm opacity-90">On selected items</p>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Popular Restaurants Section */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Popular Restaurants</h2>
          <Button variant="ghost" className="flex items-center gap-1 text-coral">
            View all <ArrowRight size={16} />
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="h-40 shimmer"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 w-2/3 shimmer rounded"></div>
                  <div className="h-4 w-4/5 shimmer rounded"></div>
                  <div className="h-4 w-3/4 shimmer rounded"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 shimmer rounded-full"></div>
                    <div className="h-6 w-16 shimmer rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {restaurants.map((restaurant) => (
              <motion.div key={restaurant.id} variants={itemAnimation}>
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
      
      {/* Popular Foods Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Most Popular Items</h2>
          <Button variant="ghost" className="flex items-center gap-1 text-coral">
            View all <ArrowRight size={16} />
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="h-40 shimmer"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 w-2/3 shimmer rounded"></div>
                  <div className="h-4 w-1/2 shimmer rounded"></div>
                  <div className="flex justify-between">
                    <div className="h-6 w-16 shimmer rounded"></div>
                    <div className="h-8 w-8 shimmer rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {popularFoods.map((food) => (
              <motion.div key={food.id} variants={itemAnimation}>
                <FoodCard food={food} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default Home;