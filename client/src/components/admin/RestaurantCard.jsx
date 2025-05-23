/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Edit, Trash2 } from "lucide-react";
// import { data } from "react-router-dom";
import { useRestaurantStore } from "../../store/useRestaurantStore";
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




const RestaurantCard = ({ restaurant, onEdit, onDelete }) => {

  const { deleteRestaurantById } = useRestaurantStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const handleEdit = () => {
    // This would typically open a modal or navigate to an edit page
    // For now, we'll just show a toast
    toast({
      title: "Edit Mode Activated",
      description: `Preparing to edit ${restaurant.title}`,
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteRestaurantById(restaurant.id);
      // onDelete(restaurant.id);
      toast({
        title: "Success",
        description: `${restaurant.title} has been deleted`,
        variant: "success",
      });
    } catch (error) {

      console.error("Error deleting restaurant:", error);
      // You might want to refresh the list after deletion
      // Consider adding toast notification here
      // toast.error("Failed to delete restaurant");
      toast({
        title: "Error",
        description: "Failed to delete restaurant",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }

  }
  return (
    <>
      <Card key={restaurant.id} className={"overflow-hidden"}>
        <div className="relative h-40">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.title}
            className="w-full h-full object-cover"
          />
          {/* Discount badge */}

          {restaurant.code && (

            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              {restaurant.code}% off
            </div>
          )}

          {/* Delivery indicator */}
          <div className={`absolute top-2 right-2 rounded-full w-3 h-3 ${restaurant.delivery ? "bg-restaurant-softGreen" : "bg-gray-400"
            }`}></div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold">{restaurant.title}</h3>

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
              Are you sure you want to delete {restaurant.title}? This action cannot be undone.
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

export default RestaurantCard;
