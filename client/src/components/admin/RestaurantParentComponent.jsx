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
  // eslint-disable-next-line no-unused-vars
  const { restaurants, getAllRestaurants, deleteRestaurantById, isLoading } = useRestaurantStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  // Refresh restaurant list
  const refreshRestaurants = async () => {
    console.log('Refreshing restaurants...');
    await getAllRestaurants();       // This should update the store's restaurants array
    console.log('After refresh:', restaurants);
  };


  // Handle edit initialization
  const handleEditInit = (restaurant) => {
    console.log('Editing restaurant:', restaurant);
    console.log('Restaurant ID:', restaurant._id);

    // setEditingRestaurant(restaurant);
    setEditingRestaurant({
      ...restaurant,
      _id: restaurant._id,  // Explicitly include _id
      coordsLat: restaurant.coords?.lat || 0,  // Add coordinates if needed
      coordsLng: restaurant.coords?.lng || 0
    });
    setIsFormOpen(true);
  };

  useEffect(() => {
    console.log('Restaurants in store:', restaurants);
    refreshRestaurants();
    getAllRestaurants();
  }, [getAllRestaurants, restaurants, refreshRestaurants]);



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
        { restaurants.length > 0 ? (

          restaurants.map((restaurant) => (
            // In your parent component (where you open the edit form), make sure you're passing the restaurant object with _id:
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              onEdit={() => handleEditInit(restaurant)}                    // edit restaurant through card
              onDelete={() => handleDelete(restaurant._id)}               // Use _id here too, has to meet consistency with backend/useRestaurantStore/ handleDelete method in RestaurantCard.jsx   // delete restaurant through card
            />
        ))
      ):(
        <div className="col-span-full text-center py-10">
            <p>No restaurants found. Create one to get started!</p>
        </div>
      )}
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
      {/* <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}> */}
      <Dialog open={isFormOpen} onOpenChange={(open) => {
        if (!open) {
          setEditingRestaurant(null); // Reset editing state when closing
        }
        setIsFormOpen(open);
      }}>
        <DialogContent className="sm:max-w-[625px]">
          {isFormOpen && ( // Ensures form mounts fresh each time
            <RestaurantForm
              restaurant={editingRestaurant}    // Make sure this has _id field
              // In your form success callback:
              onSuccess={async  () => {
                await refreshRestaurants();         // re-fetch from backend
                setIsFormOpen(false);
                setEditingRestaurant(null);
              }}
              onCancel={() => setIsFormOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantParentComponent;