import { useState } from "react";
import { useFoodStore } from "../../store/useFoodStore";
import FoodItemCard from "./FoodItemCard";
import FoodItemForm from "./FoodItemForm";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect } from "react";
import axios from 'axios';
import { toast } from "sonner";
import { API_ROUTES } from "@/utils/api";
// import { API_ROUTES } from "@/utils/api";
// import categoryAxios from '../../store/useCategoryStore'
// import tagsAxios from '../../store/useTagStore'


// ✅ GOAL:
// When the Edit button is clicked on a RestaurantCard, open the RestaurantForm pre-filled with the data of that restaurant, allowing updates.

// ✅ RECOMMENDED APPROACH:
// You’ll need a parent component (e.g. RestaurantManager) to:
// Store state for the selected restaurant to edit
// Render the form conditionally (either for creation or editing)
// Pass the selected restaurant to the form via props

// const FoodItemParentComponent = ({ restaurantId }) => {   // Add restaurantId as prop
const FoodItemParentComponent = () => {   // Add restaurantId as prop

  const { food, getAllFood, deleteFood } = useFoodStore();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [restaurants, setRestaurants] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [editingFood, setEditingFood] = useState(null);

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);

  // Refresh restaurant list
  // const refreshRestaurants = async () => {
  const refreshFoods = async () => {
    await getAllFood();
  };

  // Handle edit initialization
  const handleEditInit = (food) => {                          // food is nothing but foodItem in the schema context
    // setEditingRestaurant(food);                        // --> This is for restaurant, hence commented out.       
    setEditingFood(food);
    setIsFormOpen(true);

    toast.success("Edit Mode Activated", {
      description: `Preparing to edit ${food.title}`,
    });
  };

  // useEffect(() => {
  //   // getAllRestaurants();
  //   getAllFood();
  // // }, [getAllRestaurants]);
  // }, [getAllFood]);

  // Fetch categories and tags when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsLoadingCategories(true);
      setIsLoadingTags(true);
      setIsLoadingRestaurants(true);
      try {
        await getAllFood();
        // Add these API calls to fetch categories and tags
        // const catResponse = await axios.get('/api/v1/categories');
        // const tagsResponse = await axios.get('/api/v1/tags');
        // setCategories(catResponse.data);
        // setTags(tagsResponse.data);

        const [catResponse, tagsResponse, restaurantResponse] = await Promise.all([
          // axios.get('/api/v1/category'),
          axios.get(`${API_ROUTES.CATEGORY}/getAllCategory`),
          // categoryAxios.get(`${API_ROUTES.CATEGORY}`),
          // axios.get('/api/v1/tags')
          axios.get(`${API_ROUTES.TAGS}/getAllTags`),
          // tagsAxios.get(`${API_ROUTES.TAGS}`)
          axios.get(`${API_ROUTES.RESTAURANT}/getAllRestaurants`)
        ]);

        // console.log('Category API Response:', catResponse.data);
        console.log('Tags API Response:', tagsResponse.data);

        // Ensure you're extracting the correct data
        setCategories(catResponse.data.categories || []);
        setTags(tagsResponse.data.tags || []);
        setRestaurants(restaurantResponse.data.restaurants || [])

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingCategories(false);
        setIsLoadingTags(false);
        setIsLoadingRestaurants(false);
      }
    };
    fetchData();
  }, [getAllFood]);

  useEffect(() => {
    console.log('Categories:', categories);
    console.log('Tags:', tags);
    console.log('Restaurants:', restaurants);
  }, [categories, tags, restaurants]);

  // // Handle form submission (both create and update)
  const handleFormSubmit = async () => {
    // await refreshRestaurants();
    // await refreshFoods();
    // setIsFormOpen(false);
    // getAllFood(null);

    try {
      await getAllFood(); // Refresh the food list
      setIsFormOpen(false);
      setEditingFood(null);
      toast.success("Food item saved successfully");
    } catch (error) {
      console.error("Error refreshing food list:", error);
    }
  };

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


      {isLoading ? (
        <div>Loading food items...</div>
      ) : Array.isArray(food) && food.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {food.map((restaurant) => ( */}
          {food.map((food) => (
            // <RestaurantCard
            <FoodItemCard
              key={food._id}
              food={food}             // Pass the current item
              onEdit={() => handleEditInit(food)}                             // edit restaurant through card
              onDelete={() => handleDelete(food._id)}                          // delete restaurant through card
            // onSuccess={handleFormSubmit} // handle form submission
            />
          ))}
        </div>
      ) : (
        <div>No food items found</div>
      )}



      {/* Restaurant Form Modal/Dialog */}
      {/* {isFormOpen && (                                  // --> This creates a duplicate dialog, hence commented out.
        // <RestaurantForm
        <FoodItemForm
          // restaurant={editingRestaurant}
          food={editingFood}
          onSuccess={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            // setEditingRestaurant(null);
            setEditingFood(null);
          }}
        />
      )} */}

      {/* Restaurant Form Modal */}
      {/* <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}> */}
      <Dialog open={isFormOpen} onOpenChange={(open) => {
        if (!open) {
          setEditingFood(null);
        }
        setIsFormOpen(open);
      }}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {editingFood ? "Edit Food Item" : "Add Food Item"}
            </DialogTitle>
          </DialogHeader>

          {/* Only render FoodItemForm -- no need of rendering FoodItemCard*/}

          {/* <RestaurantForm */}
          {/* <FoodItemCard
            food={editingFood}
            // onSuccess={() => {
            //   refreshFoods();         // re-fetch from backend
            //   setIsFormOpen(false);
            // }}
            onSuccess={handleFormSubmit}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingFood(null);

            }}

            categories={[]}  // Pass actual categories from your store
            tags={[]}        // Pass actual tags from your store
            restaurantId={""} // Pass actual restaurantId
          /> */}

          <FoodItemForm
            food={editingFood}
            onSuccess={handleFormSubmit}     // handle form submission
            onCancel={() => {
              setIsFormOpen(false);
              setEditingFood(null);

              // categories = { categories }
              // tags = { tags }
              // restaurantId = { restaurantId } // Pass the actual restaurant ID
            }}
            categories={categories}
            tags={tags}
            // restaurantId={restaurantId} // Pass the actual restaurant ID
            restaurants={restaurants}

            isLoadingCategories={isLoadingCategories}
            isLoadingTags={isLoadingTags}
            isLoadingRestaurants={isLoadingRestaurants}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoodItemParentComponent;