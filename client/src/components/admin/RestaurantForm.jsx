/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useRestaurantStore } from "../../store/useRestaurantStore";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { motion } from "framer-motion";
import RestaurantCard from "../admin/RestaurantCard"
import { useEffect } from "react";
// import { Switch } from "@radix-ui/react-switch";
import { Switch } from '../ui/switch'
import { toast } from "sonner";


const RestaurantForm = ({ restaurant, onSuccess, onCancel }) => {
  const { createRestaurant, updateRestaurant, isLoading, error } = useRestaurantStore();

  const form = useForm({
    defaultValues: {
      title: "",
      imageUrl: "",
      logoUrl: "",
      time: "",
      pickup: false,
      delivery: false,
      isOpen: true,
      rating: 4.5,
      ratingCount: 100,
      code: "IN",
      coordsLat: 0,
      coordsLng: 0,
    },

    // Add this resolver if using react-hook-form validation
    resolver: async (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = { message: "Title is required" };
      }
      // if (values.coordsLat === 0 && values.coordsLng === 0) {
      //   errors.coordsLat = { message: "Please set valid coordinates" };
      //   errors.coordsLng = { message: "Please set valid coordinates" };
      // }
      if (Math.abs(values.coordsLat) > 90 || Math.abs(values.coordsLng) > 180) {
        errors.coordsLat = { message: "Invalid latitude (-90 to 90)" };
        errors.coordsLng = { message: "Invalid longitude (-180 to 180)" };
      }
      return { values, errors };
    }
  });


  // Set form values when editing
  useEffect(() => {
    if (restaurant) {
      form.reset({
        ...restaurant,
        coordsLat: restaurant.coords?.lat || 0,
        coordsLng: restaurant.coords?.lng || 0
      });
    }
  }, [restaurant, form]);

  const onSubmit = async (data) => {
    // Ensure coordinates are numbers, not strings
    const coords = {
      // lat: parseFloat(data.coordsLat),
      lat: Number(data.coordsLat),
      // lng: parseFloat(data.coordsLng)
      lng: Number(data.coordsLng)
    };

    // Verify coordinates are valid
    if (coords.lat === 0 || coords.lng === 0) {
      toast.error("Please set valid location coordinates");
      return;
    }

    // const result = await createRestaurant(
    const restaurantData = {
      title: data.title,
      imageUrl: data.imageUrl,
      foods: [],                  // or array of food IDs
      time: data.time,
      pickup: data.pickup,
      delivery: data.delivery,
      isOpen: data.isOpen,
      logoUrl: data.logoUrl,
      rating: data.rating,
      ratingCount: data.ratingCount,
      code: data.code,
      // coords,
      coords: {
        lat: Number(data.coordsLat),
        lng: Number(data.coordsLng),
        address: "", // Add if you have address data
        name: data.title // Or specific location name
      }
    };

    // if (result) {
    //   // Reset form or redirect
    //   alert("Restaurant created successfully!");
    //   form.reset();
    // }

    try {
      // if (restaurant?.restaurantId) {    // Ensure we have ID for updates
      if (restaurant?._id) {  // Use _id instead of restaurantId
        // Update existing restaurant
        // await updateRestaurant(restaurant.restaurantId, restaurantData);
        await updateRestaurant(restaurant._id, restaurantData);        // Just pass ID and data
        // toast.success("Restaurant updated!");
        toast.success("Restaurant Updated!",{
          // title: "Restaurant Updated!",
          description: "Successfully Updated the restaurant.",
          duration: 3000,
        });
      } else {
        // Create new restaurant
        await createRestaurant(restaurantData);
        // toast.success("Restaurant created!");
        toast.success("Restaurant Created!",{
          // title: "Restaurant Created!",
          description: "Successfully added the restaurant.",
          duration: 3000,
        });
      }
      onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      // toast.error(error.response?.data?.message || "Failed to save restaurant");
      toast.error("Error",{
        // title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });

    }
  };

  //   // In your parent component (e.g., RestaurantList)
  // const handleEdit = (restaurant: Restaurant) => {
  //   // Handle edit logic
  //   console.log("Editing:", restaurant);
  // };


  // const handleDelete = (id: string) => {
  //   // Handle post-delete logic (like refreshing the list)
  //   console.log("Deleted restaurant ID:", id);
  // };
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint to-mint/30 dark:from-navy-light/20 dark:to-navy/30 p-4">
    // <div className="h-[100vh] flex items-center justify-center bg-gradient-to-br from-mint to-mint/30 dark:from-navy-light/20 dark:to-navy/30 p-4">
    // <div className="max-h-[90vh] overflow-y-auto bg-white shadow-md rounded-2xl px-6 py-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // className="w-full max-w-md"
      className="w-full"
    >

      {/* <Card className="w-full border-0 shadow-lg backdrop-blur-xl bg-white/70 dark:bg-navy/70"> */}
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Create New Restaurant</CardTitle>
        <CardDescription>Enter restaurant details to add a new listing</CardDescription>
      </CardHeader>

      {/* <CardContent> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">

          {/* <div className="grid grid-cols-2 gap-6"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Restaurant title" className=" col-span-2 w-full bg-white/50 dark:bg-navy/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL */}
            <FormField
              control={form.control}
              name="imageUrl"
              rules={{ required: "Image URL is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL" className=" col-span-1 w-full  bg-white/50 dark:bg-navy/50" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Logo URL */}
            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Logo URL" className=" col-span-1 w-full  bg-white/50 dark:bg-navy/50" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Delivery Time */}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Delivery Time</FormLabel>
                  <FormControl>
                    <Input placeholder="30-40 mins" className="bg-white/50 dark:bg-navy/50" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Switches */}
            {/* Checkboxes for Pickup | DElivery*/}
            <FormField
              control={form.control}
              name="pickup"
              render={({ field }) => (
                // <FormItem className="flex items-center gap-2">
                <FormItem className="col-span-1 flex items-center gap-2">
                  <FormControl>
                    {/* <input type="checkbox" {...field} checked={field.value} /> */}
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormLabel>Pickup Available?</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delivery"
              render={({ field }) => (
                // <FormItem className="flex items-center gap-2">
                <FormItem className="col-span-1 flex items-center gap-2">
                  <FormControl>
                    {/* <input type="checkbox" {...field} checked={field.value} /> */}
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormLabel>Delivery Available?</FormLabel>
                </FormItem>
              )}
            />

            {/* currently open */}
            <FormField
              control={form.control}
              name="isOpen"
              render={({ field }) => (
                <FormItem className="col-span-1 flex items-center gap-2">
                  <FormLabel>Currently Open?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* // Add to your form fields */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                // <FormItem className="md:col-span-2">
                <FormItem className="col-span-1 w-full bg-white/50 dark:bg-navy/50">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Full address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/*  Coordinates */}
            <FormField
              control={form.control}
              name="coordsLat"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Latitude"
                      type="number"
                      className="col-span-1 w-full bg-white/50 dark:bg-navy/50"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordsLng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Longitude"
                      type="number"
                      className="col-span-1 w-full  bg-white/50 dark:bg-navy/50"
                      {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Rating Fields */}
            {/* <div className="grid grid-cols-2 gap-4"> */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      className="col-span-1 w-full bg-white/50 dark:bg-navy/50"
                      {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ratingCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className=" col-span-1 w-full bg-white/50 dark:bg-navy/50"
                      {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="pb-4">     {/* ⬅️ Add this padding */}
                  <FormLabel>Coupon Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. ABC12f10%"
                      className="col-span-1 w-full bg-white/50 dark:bg-navy/50"
                      {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>     {/* ✅ Ends the grid with all form inputs -- hence not overlapping*/}

          {/* <div className="flex justify-end gap-2 pt-4"> */}
          {/* <div className="flex flex-col md:flex-row justify-end items-center gap-2 mt-4"> */}
          <div className="col-span-2 flex flex-col md:flex-row justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              // className="w-full bg-black text-white hover:bg-black transition-colors"
              // className="w-full md:w-auto bg-black text-white hover:bg-black transition-colors"
              className="w-full md:w-[48%] bg-black text-white"
            > Cancel
            </Button>
            <Button type="submit"
              disabled={isLoading}
              // className="w-full bg-restaurant-softRed text-white hover:bg-restaurant-softRed transition-colors"
              // className="w-full md:w-auto bg-restaurant-softRed text-white hover:bg-restaurant-softRed transition-colors"
              className="w-full md:w-[48%] bg-restaurant-softRed text-white"
            >
              {isLoading ? "Creating..." : restaurant ? "Update Restaurant" : "Create Restaurant"}
            </Button>
          </div>
          {/* You already show a message via FormMessage, but show the backend error also clearly. You already have: */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md">
              <p className="font-medium">Error:</p>
              {/* <p className="text-red-500 text-sm text-center mt-2"> */}
              <p>{error}</p>
              {/* {error} */}
            </div>
          )}

          {/* ✅ Good! Just maybe make it a bit more prominent: */}
          {/* <p className="text-red-500 text-sm font-medium text-center mt-2 animate-pulse">{error}</p> */}

          {/* </div> */}
        </form>
      </Form>
      {/* </CardContent> */}

      <CardFooter className="text-sm text-muted-foreground mt-2 text-center text-gray-500">
        You can manage restaurants after creating them.
      </CardFooter>
      {/* </Card> */}
    </motion.div>
    // </div>
    // </div> 
  );
};

export default RestaurantForm;
