/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useFoodStore } from "../../store/useFoodStore";
import FoodItemCard from "./FoodItemCard";
import FoodItemForm from "./FoodItemForm";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect } from "react";



// ✅ GOAL:
// When the Edit button is clicked on a RestaurantCard, open the RestaurantForm pre-filled with the data of that restaurant, allowing updates.

// ✅ RECOMMENDED APPROACH:
// You’ll need a parent component (e.g. RestaurantManager) to:
// Store state for the selected restaurant to edit
// Render the form conditionally (either for creation or editing)
// Pass the selected restaurant to the form via props

const FoodItemParentComponent = () => {
  const { food, getAllFood, deleteFood } = useFoodStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [editingFood, setEditingFood] = useState(null);

  // Refresh restaurant list
  // const refreshRestaurants = async () => {
  const refreshFoods = async () => {
    await getAllFood();
  };

  // Handle edit initialization
  const handleEditInit = (food) => {
    // setEditingRestaurant(food);
    setEditingFood(food);
    setIsFormOpen(true);
  };

  useEffect(() => {
    // getAllRestaurants();
    getAllFood();
  // }, [getAllRestaurants]);
  }, [getAllFood]);


  // // Handle form submission (both create and update)
  // const handleFormSubmit = async () => {
  //   await refreshRestaurants();
  //   setIsFormOpen(false);
  //   setEditingRestaurant(null);
  // };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      // await deleteRestaurantById(id);
      await deleteFood(id);

      // await refreshRestaurants();
      await refreshFoods();
    } catch (error) {
      console.error("Failed to delete food item:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Food Item</h2>
        <Button onClick={() => {
          setEditingFood(null);
          setIsFormOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add Food Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {food.map((restaurant) => (
          // <RestaurantCard
          <FoodItemCard
            key={food.id}
            food={food}
            onEdit={() => handleEditInit(food)}                             // edit restaurant through card
            onDelete={() => handleDelete(food.id)}              // delete restaurant through card

          />
        ))}
      </div>

      {/* Restaurant Form Modal/Dialog */}
      {/* {isFormOpen && (
        <RestaurantForm
          restaurant={editingRestaurant}
          onSuccess={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingRestaurant(null);
          }}
        />
      )} */}

      {/* Restaurant Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[625px]">
          {/* <RestaurantForm */}
          <FoodItemCard
            food={editingFood}
            onSuccess={() => {
              refreshFoods();         // re-fetch from backend
              setIsFormOpen(false);
            }}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoodItemParentComponent;