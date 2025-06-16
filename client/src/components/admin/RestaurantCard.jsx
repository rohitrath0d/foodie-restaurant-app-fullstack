import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Edit, Trash2 } from "lucide-react";
// import { data } from "react-router-dom";
import { useRestaurantStore } from "../../store/useRestaurantStore";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "../ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
  DialogFooter,

} from "../../components/ui/dialog";
import { toast } from "../ui/sonner";
import PropTypes from 'prop-types';




const RestaurantCard = ({ restaurant, onEdit, onDelete }) => {

  const { deleteRestaurantById } = useRestaurantStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const handleEdit = async () => {
    // This would typically open a modal or navigate to an edit page
    // For now, we'll just show a toast

    try {
      // Call the parent's edit handler if it exists
      if (onEdit) {
        onEdit(restaurant);
      } else {
        toast.info(`Edit mode for ${restaurant.title}`, {
          description: "Edit functionality will open here"
        });
      }
    } catch (error) {
      toast.error(
        // {
        // title: "Edit Mode Activated",
        "Failed to initiate edit", {
        description: `Preparing to edit ${restaurant.title}`,
        variant: "destructive"
      });
      console.error("Edit error:", error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {


      // await deleteRestaurantById(restaurant.id);
      // // onDelete(restaurant.id);

      // toast({
      //   title: "Success",
      //   description: `${restaurant.title} has been deleted`,
      //   variant: "success",
      // });

      // await toast.promise(
      toast.promise(
        // deleteRestaurantById(restaurant.id),
        await deleteRestaurantById(restaurant._id),
        {
          loading: `Deleting ${restaurant.title}...`,
          success: () => {
            if (onDelete) onDelete(restaurant._id);
            return `${restaurant.title} deleted successfully`;
          },
          error: (err) => err.message || "Failed to delete restaurant"
        }
      );
    } catch (error) {
      console.error("Error deleting restaurant:", error);

      // You might want to refresh the list after deletion
      // Consider adding toast notification here
      // toast.error("Failed to delete restaurant");

      toast.error(  "Error",
        {
        // title: "Error",
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
      <Card key={restaurant.id} className="overflow-hidden">
        <div className="relative h-40">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.title}
            className="w-full h-full object-cover"

            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Restaurant';
            }}
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
              disabled={isDeleting}
            >
              <Edit size={14} className="mr-1" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card >

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {restaurant.title}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <DialogClose disabled={isDeleting}>Cancel</DialogClose> */}
            <DialogClose asChild>
              <Button variant="outline" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>

            {/* <DialogTrigger
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </DialogTrigger> */}

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // ... other props
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default RestaurantCard;
