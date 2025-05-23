import { useState } from "react";
import { useRestaurantStore } from "../../store/useRestaurantStore";
import RestaurantCard from "./RestaurantCard";
import RestaurantForm from "./RestaurantForm";
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

const RestaurantParentComponent = () => {
  const { restaurants, getAllRestaurants, deleteRestaurantById } = useRestaurantStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  // Refresh restaurant list
  const refreshRestaurants = async () => {
    await getAllRestaurants();
  };

  // Handle edit initialization
  const handleEditInit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setIsFormOpen(true);
  };

  useEffect(() => {
    getAllRestaurants();
  }, [getAllRestaurants]);


  // // Handle form submission (both create and update)
  // const handleFormSubmit = async () => {
  //   await refreshRestaurants();
  //   setIsFormOpen(false);
  //   setEditingRestaurant(null);
  // };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteRestaurantById(id);
      await refreshRestaurants();
    } catch (error) {
      console.error("Failed to delete restaurant:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Restaurants</h2>
        <Button onClick={() => {
          setEditingRestaurant(null);
          setIsFormOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add Restaurant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onEdit={() => handleEditInit(restaurant)}                             // edit restaurant through card
            onDelete={() => handleDelete(restaurant.id)}              // delete restaurant through card

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
          <RestaurantForm
            restaurant={editingRestaurant}
            onSuccess={() => {
              refreshRestaurants();         // re-fetch from backend
              setIsFormOpen(false);
            }}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantParentComponent;