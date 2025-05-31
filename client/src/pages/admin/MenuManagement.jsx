// Food item management page / component will be happening here.

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import MenuItemsTab from "@/components/admin/MenuItemsTab";

// import CategoriesTab from "@/components/admin/CategoriesTab";
// import TagsTab from "@/components/admin/TagsTab";

// import { mockFoodItems, mockCategories, mockTags } from "@/data/mockMenuData";
import FoodItemParentComponent from "../../components/admin/FoodItemParentComponent";
import { useFoodStore } from "../../store/useFoodStore";
import CategoriesTabMenu from "@/components/admin/CategoriesTabMenu";
import TagsTabMenu from "../../components/admin/TagsTabMenu";

const MenuManagement = () => {
  const [activeTab, setActiveTab] = useState("menuItems");
  const {food} = useFoodStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Menu Management</h1>
        <p className="text-gray-500">Manage your restaurant's menu items, categories, and tags</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="menuItems">Menu Items</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menuItems" className="space-y-6">
          <FoodItemParentComponent 
            menuItems={food} 
            categories = {[]}
            tags = {[]}
            // categories={mockCategories} 
            // tags={mockTags} 
          />
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
          {/* <CategoriesTab categories={mockCategories} /> */}
          <CategoriesTabMenu />
        </TabsContent>
        
        <TabsContent value="tags" className="space-y-6">
          {/* <TagsTab tags={mockTags} /> */}
          <TagsTabMenu />
          
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuManagement;