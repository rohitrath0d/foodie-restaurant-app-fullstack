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
import { Switch } from "@radix-ui/react-switch";


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
    const coords = {
      lat: parseFloat(data.coordsLat),
      lng: parseFloat(data.coordsLng)
    };

    // const result = await createRestaurant(
    const restaurantData = {
      // data.title,
      title: data.title,
      imageUrl: data.imageUrl,
      foods: [], // assuming foods will be added later
      time: data.time,
      pickup: data.pickup,
      delivery: data.delivery,
      isOpen: data.isOpen,
      logoUrl: data.logoUrl,
      rating: data.rating,
      ratingCount: data.ratingCount,
      code: data.code,
      coords,
    };

    // if (result) {
    //   // Reset form or redirect
    //   alert("Restaurant created successfully!");
    //   form.reset();
    // }

    try {
      if (restaurant) {
        // Update existing restaurant
        await updateRestaurant(restaurant.id, restaurantData);
      } else {
        // Create new restaurant
        await createRestaurant(restaurantData);

      }
      onSuccess();

    } catch (error) {
      console.error("Form submission error:", error);
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
          className="w-full max-w-md"
        >
          {/* <Card className="border-0 shadow-lg backdrop-blur-xl bg-white/70 dark:bg-navy/70"> */}
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Create New Restaurant</CardTitle>
              <CardDescription>Enter restaurant details to add a new listing</CardDescription>
            </CardHeader>

            {/* <CardContent> */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      rules={{ required: "Title is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Restaurant title" className="bg-white/50 dark:bg-navy/50" {...field} />
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
                            <Input placeholder="Image URL" className="bg-white/50 dark:bg-navy/50" {...field} />
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
                            <Input placeholder="Logo URL" className="bg-white/50 dark:bg-navy/50" {...field} />
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
                            <Input placeholder="Estimated time" className="bg-white/50 dark:bg-navy/50" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Checkboxes for Pickup | DElivery*/}
                    <FormField
                      control={form.control}
                      name="pickup"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            {/* <input type="checkbox" {...field} checked={field.value} /> */}
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
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
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            {/* <input type="checkbox" {...field} checked={field.value} /> */}
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
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
                        <FormItem>
                          <FormLabel>Currently Open?</FormLabel>
                          <FormControl>
                            {/* <Input placeholder="Latitude" type="number" className="bg-white/50 dark:bg-navy/50" {...field} /> */}
                            <Switch
                              className='"bg-white/50 dark:bg-navy/50"'
                              checked={field.value}
                              onCheckedChange={field.onChange}

                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/*  Coordinates */}
                    <FormField
                      control={form.control}
                      name="coordsLat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input placeholder="Latitude" type="number" className="bg-white/50 dark:bg-navy/50" {...field} />
                          </FormControl>
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
                            <Input placeholder="Longitude" type="number" className="bg-white/50 dark:bg-navy/50" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Rating Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" {...field} />
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
                              <Input type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Code */}
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Country code" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2 pt-4">


                      <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="w-full bg-black text-white hover:bg-black transition-colors"
                      > Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading} className="w-full bg-restaurant-softRed text-white hover:bg-restaurant-softRed transition-colors">
                        {isLoading ? "Creating..." : restaurant ? "Update Restaurant" : "Create Restaurant"}
                      </Button>
                      {/* You already show a message via FormMessage, but show the backend error also clearly. You already have: */}
                      {/* {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>} */}

                      {/* ✅ Good! Just maybe make it a bit more prominent: */}
                      <p className="text-red-500 text-sm font-medium text-center mt-2 animate-pulse">{error}</p>

                    </div>
                  </div>
                </form>
              </Form>
            {/* </CardContent> */}

            <CardFooter className="text-xs text-center text-gray-500">
              You can manage restaurants after creating them.
            </CardFooter>
          {/* </Card> */}
        </motion.div>
      // </div>
    // </div> 
  );
};

export default RestaurantForm;
