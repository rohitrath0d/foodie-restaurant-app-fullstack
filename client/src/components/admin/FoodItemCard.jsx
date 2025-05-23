/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Edit, Trash2 } from "lucide-react";
// import { data } from "react-router-dom";
import { useFoodStore } from "../../store/useFoodStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "../ui/sonner";




const FoodItemCard = ({ food, onEdit, onDelete }) => {

  const { deleteFood } = useFoodStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const handleEdit = () => {
    // This would typically open a modal or navigate to an edit page
    // For now, we'll just show a toast
    toast({
      title: "Edit Mode Activated",
      description: `Preparing to edit ${food.title}`,
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteFood(food.id);
      // onDelete(restaurant.id);
      toast({
        title: "Success",
        description: `${food.title} has been deleted`,
        variant: "success",
      });
    } catch (error) {

      console.error("Error deleting food item:", error);
      // You might want to refresh the list after deletion
      // Consider adding toast notification here
      // toast.error("Failed to delete restaurant");
      toast({
        title: "Error",
        description: "Failed to delete food item",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }

  }
  return (
    <>
      <Card key={food.id} className={"overflow-hidden"}>
        <div className="relative h-40">
          <img
            src={food.imageUrl}
            alt={food.title}
            className="w-full h-full object-cover"
          />
          {/* Discount badge */}

          {food.code && (

            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              {food.code}% off
            </div>
          )}

          {/* Delivery indicator */}
          <div className={`absolute top-2 right-2 rounded-full w-3 h-3 ${food.delivery ? "bg-restaurant-softGreen" : "bg-gray-400"
            }`}></div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold">{food.title}</h3>

            {/* <p>

          </p> */}
          </div>

          {/* <p>

        </p> */}

          {/* <div className="flex flex-wrap gap-1 mb-3">
          {data.

            <span>

            </span>
          }
        </div> */}


          {/* Add more restaurant details here if needed */}
          {/* Example:
        <p className="text-sm text-gray-600 mb-3">
          Delivery time: {restaurant.time}
        </p>
        */}



          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-500 hover:bg-red-50"
              // onClick={handleDelete}
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeleting}


            >

              <Trash2 size={14} className="mr-1" />
              {/* Delete */}
              {isDeleting ? "Deleting..." : "Delete"}

            </Button>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => onEdit(restaurant)}
              onClick={handleEdit}
            >
              <Edit size={14} className="mr-1" />
              Edit
            </Button>
          </div>

        </CardContent>
      </Card >


      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {food.title}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default FoodItemCard;
