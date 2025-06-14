// Restaurant management page / component will be happening here.

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import FoodItemParentComponent from "../../components/admin/FoodItemParentComponent";
import RestaurantParentComponent from "@/components/admin/RestaurantParentComponent";
// import { useFoodStore } from "../../store/useFoodStore";
// import CategoriesTabMenu from "@/components/admin/CategoriesTabMenu";
// import TagsTabMenu from "../../components/admin/TagsTabMenu";
// import useCategoryStore from "@/store/useCategoryStore";
// import { useTagStore } from "@/store/useTagStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import RestaurantForm from "@/components/admin/RestaurantForm";
import { Button } from "@/components/ui/button";

const RestaurantManagement = () => {

  const { restaurants } = useRestaurantStore()

  const [activeTab, setActiveTab] = useState("createRestaurants");


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Restaurant Management</h1>
        <p className="text-gray-500">Create and Manage Restaurants</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="createRestaurants">Create Restaurant</TabsTrigger>
          <TabsTrigger value="ListedRestaurants"> Listed Restaurants </TabsTrigger>
          {/* <TabsTrigger value="tags">Tags</TabsTrigger> */}
        </TabsList>

        <TabsContent value="ListedRestaurants" className="space-y-6">
          {/* <RestaurantParentComponent
            // menuItems={food} 
            restaurant={restaurant}

          /> */}
          {
            restaurants.length > 0 ? (
              <RestaurantParentComponent restaurants = {restaurants}/>
            ) : (
              <div  className="text-center py-8">
                <p className="text-gray-500">
                  No restaurants found. Create your first restaurant!
                </p>

                <Button 
                onClick={() => setActiveTab("createRestaurants")}
                className="mt-4"
              >
                Create Restaurant
              </Button>
              </div>
            )}
        </TabsContent>

        {/* <TabsContent value="categories" className="space-y-6">
          <CategoriesTabMenu />
        </TabsContent>
        
        <TabsContent value="tags" className="space-y-6">
          <TagsTabMenu />
          
        </TabsContent> */}

       {/* Create Restaurant Tab */}
        <TabsContent value="createRestaurants" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Restaurant</h2>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("ListedRestaurants")}
              >
                View All Restaurants
              </Button>
            </div>

            <RestaurantForm 
              onSuccess={() => setActiveTab("ListedRestaurants")}
            />
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default RestaurantManagement;