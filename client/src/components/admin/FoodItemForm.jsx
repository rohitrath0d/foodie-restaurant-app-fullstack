/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../..//components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { useFoodStore } from "../../store/useFoodStore";


const FoodItemForm = (foods, onSuccess, onCancel) => {
  const {createFood, updateFood, isLoading, error} = useFoodStore();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      foodTags: [],
      category: "",
      code: "",
      isAvailable: false,
      restaurant: "",
      rating: 0,
    }
  })

}

export default FoodItemForm;