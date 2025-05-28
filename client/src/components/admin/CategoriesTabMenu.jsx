/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
// import { FoodCategory } from "@/types";
import {useCategoryStore} from '../../store/useCategoryStore'
import { Plus, Edit, Trash2 } from "lucide-react";

// interface CategoriesTabProps {
//   categories: FoodCategory[];
// }

// const CategoriesTabMenu: React.FC<CategoriesTabProps> = ({ categories }) => {
const CategoriesTabMenu = () => {

  const  {category,  isLoading, error,  getAllCategory, deleteCategory } = useCategoryStore();

   // Fetch categories on mount
  React.useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

   const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
      // Refresh the list after deletion
      await getAllCategory();
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Food Categories</h2>
        <Button>
          <Plus size={16} className="mr-1" />
          Add Category
        </Button>
      </div>
      

       {error && (
        <div className="text-red-500">{error}</div>
      )}

      {/* Also add images for categories  */}
      
      {/* {isLoading ? (
        <div>Loading categories...</div>
      ) : ( */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {category?.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{category.icon}</span>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesTabMenu;