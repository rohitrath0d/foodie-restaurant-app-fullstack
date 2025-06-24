/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
// import { FoodItem } from "@/types";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../../components/ui/dialog";
import { Star, Plus, Tag, Clock } from "lucide-react";
import { cn } from "../../lib/utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "../../components/ui/sonner";
import axios from "axios";
import { API_ROUTES } from "@/utils/api";
import { useFoodStore } from "@/store/useFoodStore";



// interface FoodCardProps {
//   food: FoodItem;
//   className?: string;
// }

// export const FoodCard = ({ food, className }: FoodCardProps) => {
// export const FoodCard = ({ foodId, className }) => {
export const FoodCard = ({ food, className }) => {

  const [showModal, setShowModal] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  // const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const {getAllFoods} = useFoodStore();

  // useEffect(() => {
  //   const fetchFoodItem = async () => {
  //     try {
  //       // const response = await axios.get(`/api/food/getFoodById/${foodId}`);
  //       const response = await axios.get(`${API_ROUTES.FOOD}/getFoodById/${foodId}`);
  //       setFood(response.data.food);
  //     } catch (error) {
  //       console.error("Error fetching food item:", error);
  //       toast.error("Failed to load food item");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (foodId) {
  //     fetchFoodItem();
  //   }
  // }, [foodId]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    try {
      // await axios.post("/api/cart/add", { foodId: food._id })
      await axios.post(`${API_ROUTES.CART}/addToCart`, { foodId: food._id })
      // setTimeout(() => {
      //   setIsAddingToCart(false);
      //   setShowModal(false);
      //   toast.success("Item added to cart!", {
      //     description: `${food.title} has been added to your cart.`,
      //     position: "bottom-center"
      //   });
      //   // Here you would actually add to cart
      //   console.log("Added to cart:", food);
      // }, 500);

      toast.success("Item added to cart!", {
        description: `${food.title} has been added to your cart.`,
        position: "bottom-center"
      });

      setShowModal(false);
    } catch (error) {
      toast.error("Failed to add item to cart");

    } finally {
      setIsAddingToCart(false);
    }
  };

  // if (loading) {
  //   return (
  //     <Card className={cn("overflow-hidden", className)}>
  //       <div className="relative h-40 overflow-hidden bg-gray-200 animate-pulse"></div>
  //       <div className="p-4 space-y-3">
  //         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  //         <div className="h-3 bg-gray-200 rounded w-1/2"></div>
  //         <div className="flex justify-between">
  //           <div className="h-4 bg-gray-200 rounded w-1/4"></div>
  //           <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
  //         </div>
  //       </div>
  //     </Card>
  //   );
  // }

  if (!food) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="p-4 text-center text-red-500">
          No food data provided
        </div>
      </Card>
    );
  }

  // Transform backend data to match frontend expectations
  const formattedFood = {
    ...food,
    image: food.imageUrl,
    available: food.isAvailable,
    hasCoupon: !!food.code,
    couponCode: food.code,
    couponDiscount: 10, // Adjust based on your actual discount logic
    preparationTime: food.preparationTime || "15-20 mins",
    foodTags: Array.isArray(food.foodTags) ? food.foodTags.map(tag => ({
      id: tag._id || Math.random().toString(36).substring(7),
      name: tag.name || tag,
      color: tag.color || "#FF5733"
    })) : [],
    description: {
      text: food.description || "No description available"
    }
  };


  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Card
          className={cn(
            "overflow-hidden cursor-pointer group card-hover",
            className
          )}
          onClick={() => setShowModal(true)}
        >
          <div className="relative h-40 overflow-hidden">
            <img
              // src={food.image}
              src={formattedFood.image}
              // alt={food.title}
              alt={formattedFood.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
               onError={(e) => {
                e.target.src = '/food-placeholder.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"></div>

            {/* {food.hasCoupon && ( */}
            {formattedFood.hasCoupon && (
              <div className="absolute top-3 left-0 bg-coral text-white font-medium px-3 py-1 text-xs shadow-md origin-left transform -rotate-2 rounded-r-lg flex items-center">
                <Tag size={14} className="mr-1" />
                {/* {food.couponCode} */}
                {formattedFood.couponCode}
              </div>
            )}

            <Badge
              className={`absolute top-3 right-3 ${food.available ? "bg-coral text-white" : "bg-navy/70 text-mint"
                } shadow-md`}
            >
              {/* {food.available ? "Available" : "Sold Out"} */}
              {formattedFood.available ? "Available" : "Sold Out"}
            </Badge>

            <div className="absolute bottom-3 right-3 bg-mint rounded-full px-2 py-1 text-navy font-medium text-xs flex items-center shadow-md">
              <Star size={14} className="text-mustard mr-1" />
              {/* <span>{food.rating.toFixed(1)}</span> */}
              <span>{formattedFood.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-base line-clamp-1 group-hover:text-coral transition-colors">{food.title}</h3>

            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <Clock size={14} className="text-coral" />
              {/* <span>{food.preparationTime}</span> */}
              <span>{formattedFood.preparationTime}</span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-base font-bold text-coral">
                {/* ${food.price.toFixed(2)} */}
                ${formattedFood.price.toFixed(2)}
                {/* {food.hasCoupon && ( */}
                {formattedFood.hasCoupon && (
                  <span className="text-xs line-through ml-2 text-gray-400">
                    {/* ${(food.price * (1 + food.couponDiscount / 100)).toFixed(2)} */}
                    ${(formattedFood.price * (1 + formattedFood.couponDiscount / 100)).toFixed(2)}
                  </span>
                )}
              </p>

              <Button
                size="sm"
                className="bg-coral hover:bg-coral/90 text-white rounded-full w-8 h-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                  disabled={!formattedFood.available || isAddingToCart}
              >
                <Plus size={16} className={cn(isAddingToCart && "animate-bounce-small")} />
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {/* {food.foodTags.slice(0, 3).map((tag) => ( */}
              {formattedFood.foodTags.slice(0, 3).map((tag) => (
                <span
                  // key={tag.id}
                  key={tag._id}
                  className="inline-block px-2 py-0.5 text-xs rounded-full"
                  style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
              {/* {food.foodTags.length > 3 && ( */}
              {formattedFood.foodTags.length > 3 && (
                <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {/* +{food.foodTags.length - 3} */}
                  +{formattedFood.foodTags.length - 3}
                </span>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md rounded-xl overflow-hidden">
          <div className="relative w-full h-56 -mt-6 -mx-6">
            <img
              // src={food.image}
              src={formattedFood.image}
              // alt={food.title}
              alt={formattedFood.title}
              className="w-full h-full object-cover"
                onError={(e) => {
                e.target.src = '/food-placeholder.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>

            {/* {food.hasCoupon && ( */}
            {formattedFood.hasCoupon && (
              <div className="absolute top-4 left-0 bg-coral text-white px-4 py-2 text-sm font-semibold shadow-md transform -rotate-2 rounded-r-lg flex items-center">
                <Tag size={16} className="mr-2" />
                {/* {food.couponCode} - {food.couponDiscount}% off */}
                {formattedFood.couponCode} - {formattedFood.couponDiscount}% off
              </div>
            )}

            <div className="absolute bottom-4 right-4 bg-mint rounded-full px-3 py-1 text-navy font-semibold text-sm flex items-center shadow-md">
              <Star size={16} className="text-mustard mr-1" />
              {/* <span>{food.rating.toFixed(1)}</span> */}
              <span>{formattedFood.rating?.toFixed(1) || "4.5"}</span>
            </div>
          </div>

          <DialogHeader>
            {/* <DialogTitle className="text-xl">{food.title}</DialogTitle> */}
            <DialogTitle className="text-xl">{formattedFood.title}</DialogTitle>
            <DialogDescription>
              <div className="mt-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1 text-coral" />
                    {/* <span>Preparation: {food.preparationTime}</span> */}
                    <span>Preparation: {formattedFood.preparationTime}</span>
                  </div>
                  <p className="text-lg font-bold text-coral flex items-center">
                    {/* ${food.price.toFixed(2)} */}
                    ${formattedFood.price.toFixed(2)}
                    {/* {food.hasCoupon && ( */}
                    {formattedFood.hasCoupon && (
                      <span className="text-xs line-through ml-2 text-gray-400">
                        {/* ${(food.price * (1 + food.couponDiscount / 100)).toFixed(2)} */}
                        ${(formattedFood.price * (1 + formattedFood.couponDiscount / 100)).toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {/* {food.foodTags.map((tag) => ( */}
                  {formattedFood.foodTags.map((tag) => (
                    <span
                      // key={tag.id}
                      key={tag._id}
                      className="inline-block px-2 py-1 text-xs rounded-full"
                      style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* // ❌ Wrong - trying to render an object directly
                  <div>{foodItem.description}</div> 
                  // If description is an object like {text: "..."}, this will fail
                  // ✅ Correct - access the specific property
                  <div>{foodItem.description.text}</div> */}

                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {/* {food?.description?.text} */}
                  {formattedFood?.description?.text}
                </p>

                <Button
                  className="w-full bg-coral hover:bg-coral/90 text-white font-medium"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {/* {isAddingToCart ? "Adding..." : "Add to Cart"} */}
                  {!formattedFood.available ?  "Not Available" :
                   isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
