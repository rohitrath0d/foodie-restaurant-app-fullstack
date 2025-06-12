
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
// import { FoodCategory } from "@/types";
// import { useCategoryStore } from '../../store/useCategoryStore'
import useCategoryStore from '../../store/useCategoryStore'
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Toaster, toast } from "../../components/ui/sonner";
import { DialogDescription } from "@radix-ui/react-dialog";


// interface CategoriesTabProps {
//   categories: FoodCategory[];
// }

// const CategoriesTabMenu: React.FC<CategoriesTabProps> = ({ categories }) => {
const CategoriesTabMenu = () => {

  const { category, getAllCategory, createCategory, updateCategory, deleteCategory, isLoading, error, } = useCategoryStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [currentCategory, setCurrentCategory] = useState({
  //   id: "",
  //   name: "",
  //   icon: "",
  // });

  const [currentCategory, setCurrentCategory] = useState({
    id: "",
    title: "",
    imageUrl: "",
  });


  // Fetch categories on mount
  // React.useEffect(() => {
  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  const handleAddClick = () => {
    setIsEditMode(false);
    setCurrentCategory({
      // id: "",
      // name: "",
      // icon: "🍽️", // Default icon

      id: "",
      title: "",
      imageUrl: "",               // add a default imageUrl here, if needed.
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (category) => {

    // Debug the received category object
    console.log('Editing category:', category);
  

     if (!category._id) {
      console.error("No ID provided for update");
      return;
    }

    setIsEditMode(true);
    setCurrentCategory({
      id: category._id,               // Use _id instead of id
      title: category.title,
      imageUrl: category.imageUrl

    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    // if (window.confirm('Are you sure you want to delete this category?')) {
    // await deleteCategory(id);
    // // Refresh the list after deletion
    // await getAllCategory();

    if (!id) {
      console.error("No ID provided for deletion");
      return;
    }
    try {
      await deleteCategory(id);
      await getAllCategory();
      toast({
        title: "Success",
        description: "Category deleted successfully",
        variant: "default",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    // }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // While i do this, i am seeing the change of the id, that id is needed at even the time of the category creation process, and hence, this would not create without id. which we want to use it only on, delete and update.
    // if (!id) {
    //   console.error("No ID provided for update");
    //   return;
    // }


    // Debug before submission
    console.log('Current category state:', currentCategory);

    try {
      if (isEditMode) {
        // await updateCategory(currentCategory.id, {
        //   name: currentCategory.name,
        //   icon: currentCategory.icon,
        // });
        if (!currentCategory.id) {
        throw new Error("No category ID provided for update");
      }
        // await updateCategory(currentCategory.id, currentCategory);
        // await updateCategory(currentCategory._id, {
        await updateCategory(currentCategory.id, {
          title: currentCategory.title,
          imageUrl: currentCategory.imageUrl
        })
        toast({
          title: "Success",
          description: "Category updated successfully",
          variant: "default",
        });
      } else {
        // await createCategory({
        //   name: currentCategory.name,
        //   icon: currentCategory.icon,
        // });
        // await createCategory(currentCategory);
        await createCategory({
          title: currentCategory.title,
          imageUrl: currentCategory.imageUrl
        });
        toast({
          title: "Success",
          description: "Category created successfully",
          variant: "default",
        });
      }
      setIsDialogOpen(false);
      await getAllCategory();       // Refresh the list
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // No changes needed here if form input name attributes match new field names.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Common food category emojis for selection
  // const commonIcons = ["🍕", "🍔", "🍣", "🍜", "🍝", "🍛", "🍱", "🥗", "🍤", "🍦", "🍩", "☕"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Food Categories</h2>
        <Button onClick={handleAddClick} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus size={16} className="mr-1" />
          )}
          {/* <Plus size={16} className="mr-1" /> */}
          Add Category
        </Button>
      </div>

      {isLoading && <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}
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
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={() => handleEditClick(category)}>       { /* // Pass entire category object */}
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(category._id)} disabled = {isLoading} >
                    {/* <Trash2 size={16} /> */}
                      {isLoading ? <Loader2 className="animate-spin" /> : <Trash2 size={16} />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))};
      </div>


      {/* Add/Edit Category Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Category" : "Add New Category"}</DialogTitle>
             <DialogDescription>
              Are you sure you want to delete {category.title}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              {/* <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                name="name"
                value={currentCategory.name}
                onChange={handleChange}
                required
              /> */}
              <Label htmlFor="title">Category Title</Label>
              <Input
                id="title"
                name="title"
                value={currentCategory.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Category Icon / Image url </Label>
              <div className="flex items-center space-x-2">
                {/* <span className="text-2xl">{currentCategory.icon}</span> */}
                {/* <Input
                  type="text"
                  name="icon"
                  value={currentCategory.icon}
                  onChange={handleChange}
                  maxLength={2}
                  className="w-16"
                /> */}
                <Input
                  type="text"
                  name="imageUrl"
                  value={currentCategory.imageUrl}
                  onChange={handleChange}
                // maxLength={2}
                // className="w-16"
                />
              </div>
              {/* <div className="flex flex-wrap gap-2 mt-2">
                {commonIcons.map((icon) => (
                  <Button
                    key={icon}
                    type="button"
                    variant="outline"
                    size="icon"
                    className="text-xl"
                    onClick={() => setCurrentCategory(prev => ({ ...prev, icon }))}
                  >
                    {icon}
                  </Button>
                ))}
              </div> */}
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : isEditMode ? (
                  "Update Category"
                ) : (
                  "Add Category"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );

};

export default CategoriesTabMenu;