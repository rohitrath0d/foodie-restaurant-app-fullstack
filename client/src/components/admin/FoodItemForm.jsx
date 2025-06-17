/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../..//components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { useFoodStore } from "../../store/useFoodStore";
import { Card, CardContent } from "../../components/ui/card";
import PropTypes from 'prop-types';
import { toast } from "sonner";


const FoodItemForm = ({
  food,
  onSuccess,
  onCancel,
  categories = [],    // This comes from props
  tags = [],          // This comes from props
  restaurants = [],

}) => {     // prop destructuring mai we have to add {} in the props used.

  const { createFood, updateFood, isLoading, error } = useFoodStore();

  // const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const [editedItem, setEditedItem] = useState({
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    foodTags: [],
    // restaurants: "",
    restaurants: [],
    // category: "",
    category: [],
    code: "",
    isAvailable: false,
    // restaurant: restaurantId,
    rating: 0,
    // check if this fields exists on schema.
    hasCoupon: false,
    // couponCode: "",
    couponDiscount: 0,
  });

  // const form = useForm({
  //   defaultValues: {
  //     title: "",
  //     description: "",
  //     price: 0,
  //     imageUrl: "",
  //     foodTags: [],
  //     category: "",
  //     code: "",
  //     isAvailable: false,
  //     restaurant: "",
  //     rating: 0,
  //   }
  // })



  // Initialize form with foodItem data if provided (for editing)
  useEffect(() => {
    if (food) {
      // setEditedItem({
      setFormData({
        // title: foodItem.title || "",
        // description: foodItem.description || "",
        // price: foodItem.price || 0,
        // imageUrl: foodItem.imageUrl || "",
        // foodTags: foodItem.foodTags || [],
        // category: foodItem.category || "",
        // code: foodItem.code || "",
        // isAvailable: foodItem.isAvailable || false,
        // restaurant: foodItem.restaurant || "",
        // rating: foodItem.rating || 0,

        ...food,
        // restaurant: food.restaurants || restaurantId,
        hasCoupon: !!food.couponCode || '',              // make this available in schema design
        // couponCode: food.couponCode || "",
        code: food.code || "",
        couponDiscount: food.couponDiscount || 0,
      });

      // const tagIds = food.foodTags?.map(tag => tag.id) || [];
      // setSelectedTags(tagIds);
      // setSelectedTags(food.foodTags?.map(tag => tag.id) || []);

      // Safely handle foodTags initialization
      const initialTags = Array.isArray(food.foodTags)
        ? food.foodTags.map(tag => tag.id || tag._id)
        : [];
      setSelectedTags(initialTags);

    } else {
      // Create mode - reset to defaults
      // setEditedItem({
      setFormData({
        title: "",
        description: "",
        price: 0,
        imageUrl: "",
        foodTags: [],
        restaurants: "",
        category: "",
        code: "",
        isAvailable: false,
        // restaurant: restaurantId,
        rating: 0,
        hasCoupon: false,
        // couponCode: "",
        couponDiscount: 0,
      });
      setSelectedTags([])

    }
    // }, [food, restaurantId]);                                                     // missing dependency on restaurantId added.
  }, [food]);                                                     // missing dependency on restaurantId added.


  // In FoodItemForm.jsx
  useEffect(() => {
    console.log('Form Categories:', categories);
    console.log('Form Tags:', tags);
    console.log('Form Tags:', restaurants);
  }, [categories, tags, restaurants]);

  // const [selectedTags, setSelectedTags] = useState(
  //   foods ? foods.foodTags.map((tag) => tag.id) : []
  // );

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setEditedItem({ ...editedItem, [name]: value });
    // setEditedItem((prev) => ({ ...prev, [name]: value }));
    setFormData((prev) => ({ ...prev, [name]: value }));

  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // setEditedItem({ ...editedItem, [name]: parseFloat(value) || 0 });
    // setEditedItem((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));

    // };
  };
  // 

  // const handleAvailabilityChange = (checked: boolean) => {
  const handleAvailabilityChange = (checked) => {
    // setEditedItem({ ...editedItem, isAvailable: checked });
    // setEditedItem((prev) => ({ ...prev, isAvailable: checked }));
    setFormData((prev) => ({ ...prev, isAvailable: checked }));

  };

  // const handleCouponChange = (checked: boolean) => {
  const handleCouponChange = (checked) => {
    // setEditedItem((prev) => ({
    setFormData((prev) => ({
      // ...editedItem,
      ...prev,
      hasCoupon: checked,
      // couponCode: checked ? editedItem.couponCode : "",
      // couponCode: checked ? prev.couponCode : "",
      code: checked ? prev.code : "",

      // couponDiscount: checked ? editedItem.couponDiscount : 0,
      couponDiscount: checked ? prev.couponDiscount : 0,

    }));
  };


  // Fix the TypeScript error by creating a specific handler for select elements
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    // setEditedItem({ ...editedItem, categoryId: value });
    // setEditedItem((prev) =>
    setFormData((prev) =>
    ({
      ...prev,
      category: value
    }));
  };

  const handleRestaurantChange = (e) => {
    const { value } = e.target;
    // setEditedItem((prev) =>
    setFormData((prev) =>
    ({
      ...prev,
      restaurants: value
    }));
  };

  // Update the tags rendering to handle missing tags
  const handleTagToggle = (tagId) => {

    if (!tagId) return;

    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];

    setSelectedTags(newSelectedTags);

    // Safely filter tags
    const validTags = Array.isArray(tags) ? tags : [];
    // setEditedItem(prev => ({
    setFormData(prev => ({
      ...prev,
      foodTags: validTags.filter(tag => newSelectedTags.includes(tag._id || tag.id))
    }));

    // const selectedTagObjects = tags.filter((tag) => newSelectedTags.includes(tag.id)
    // );
    // setEditedItem({ ...editedItem, foodTags: selectedTagObjects });
    // setEditedItem((prev) => ({ ...prev, foodTags: selectedTagObjects }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // onSave(editedItem);

    // try {
    //   let result;
    //   if (foodItem && foodItem.id) {
    //     // Update existing food item
    //     result = await updateFood(foodItem._id, formData);
    //   } else {
    //     // Create new food item
    //     result = await createFood(
    //       formData.title,
    //       formData.description,
    //       formData.price,
    //       formData.imageUrl,
    //       formData.foodTags,
    //       formData.category,
    //       formData.code,
    //       formData.isAvailable,
    //       formData.restaurant,
    //       formData.rating
    //     );
    //   }

    //   if (result && onSuccess) {
    //     onSuccess(result);
    //   }
    // } catch (err) {
    //   console.error("Error saving food item:", err);
    //   // Error handling is already done in the store
    // }


    let success = false;

    try {
      if (food?.id) {
        // success = await updateFood(food.id, editedItem);              // have to check if it accepts id or _id
        // success = await updateFood(food._id, editedItem);              // have to check if it accepts id or _id
        success = await updateFood(food._id, formData);              // have to check if it accepts id or _id

      } else {
        // success = await createFood(
        success = await createFood(
          // editedItem.title,
          // editedItem.description,
          // editedItem.price,
          // editedItem.imageUrl,
          // editedItem.foodTags,
          // editedItem.restaurants,
          // editedItem.category,
          // editedItem.code,
          // editedItem.isAvailable,
          // // editedItem.restaurant,
          // editedItem.rating,

          formData.title,
          formData.description,
          formData.price,
          formData.imageUrl,
          formData.foodTags,
          formData.category,
          formData.code,
          formData.isAvailable,
          formData.restaurants,
          formData.rating

        );
      }
      if (success && onSuccess) {
        onSuccess();                   // This should trigger the parent to refresh data and close the form
      };
    } catch (error) {
      console.error("Error saving food item:", error);
      toast.error("Failed to save food item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // <Card className="w-full max-w-3xl mx-auto">
    // <CardContent className="pt-10 pb-10 px-6">
    <form onSubmit={handleSubmit} className="space-y-6">
      <>
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Item Name
          </label>
          <Input
            id="title"
            name="title"
            // value={editedItem.title || ''}
            value={formData.title || ''}
            onChange={handleChange}
            required
          />
        </div>

        {/* <div className="grid grid-cols-2 gap-4"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              {/* Price ($) */}
              Price (₹)
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              // value={editedItem.price}
              value={formData.price}
              onChange={handleNumberChange}
              required
            />
          </div>

          <div>
            <label htmlFor="restaurants" className="block text-sm font-medium mb-1">
              Restaurant
            </label>
            <select
              id="Restaurants"
              name="restaurants"
              // value={typeof editedItem.restaurant === 'object'
              value={typeof formData.restaurants === 'object'
                // ? editedItem.restaurant?._id
                ? formData.restaurants?._id
                // : editedItem.restaurant || ''}       //  Changed from restaurantId
                : formData.restaurants || ''}       //  Changed from restaurantId
              onChange={handleRestaurantChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              <option value="">Select a Restaurant</option>
              {
                // Array.isArray(categories) &&
                restaurants && restaurants.map((restaurant) => {
                  const restaurantId = restaurant._id || restaurant.id;
                  const restaurantName = restaurant.name || restaurant.title;
                  // <option
                  //   key={category._id || category.id}
                  //   value={category._id || category.id}>
                  //   {category.name || category.title}
                  // </option>
                  return (
                    <option key={restaurantId} value={restaurantId}>
                      {restaurantName}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              // value={typeof editedItem.category === 'object'
              value={typeof formData.category === 'object'
                // ? editedItem.category?._id
                ? formData.category?._id
                // : editedItem.category || ''}       //  Changed from categoryId
                : formData.category || ''}       //  Changed from categoryId
              onChange={handleCategoryChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              <option value="">Select a category</option>
              {
                // Array.isArray(categories) &&
                categories && categories.map((category) => {
                  const categoryId = category._id || category.id;
                  const categoryName = category.name || category.title;
                  // <option
                  //   key={category._id || category.id}
                  //   value={category._id || category.id}>
                  //   {category.name || category.title}
                  // </option>
                  return (
                    <option key={categoryId} value={categoryId}>
                      {categoryName}
                    </option>
                  );
                })}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              // value={editedItem.description}
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Image URL
            </label>
            <Input
              id="imageUrl"
              name="imageUrl"
              // value={editedItem.imageUrl || ''}
              value={formData.imageUrl || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-1">
              Rating
            </label>
            <Input
              id="rating"
              name="rating"
              // value={editedItem.rating || 0}
              value={formData.rating || 0}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="isAvailable"
              // checked={editedItem.isAvailable}
              checked={formData.isAvailable}
              onCheckedChange={handleAvailabilityChange}
            />
            <label htmlFor="isAvailable" className="text-sm font-medium">
              Available
            </label>
          </div>

          {/* check whether the id and name exists on the schema */}
          <div className="flex items-center space-x-2">
            <Switch
              id="hasCoupon"
              // checked={editedItem.hasCoupon}
              checked={formData.hasCoupon}
              onCheckedChange={handleCouponChange}
            />
            <label htmlFor="hasCoupon" className="text-sm font-medium">
              Has Coupon ?
            </label>
          </div>
        </div>

        {
          // editedItem.hasCoupon && (
          formData.hasCoupon && (
            // <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                {/* <label htmlFor="couponCode" className="block text-sm font-medium mb-1"> */}
                <label htmlFor="code" className="block text-sm font-medium mb-1">
                  Coupon Code
                </label>
                <Input
                  // id="couponCode"
                  id="code"
                  // name="couponCode"
                  name="code"
                  // value={editedItem.couponCode}
                  // value={formData.couponCode}
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="couponDiscount" className="block text-sm font-medium mb-1">
                  Discount (%)
                </label>
                <Input
                  id="couponDiscount"
                  name="couponDiscount"
                  type="number"
                  min="0"
                  max="100"
                  // value={editedItem.couponDiscount}
                  value={formData.couponDiscount}
                  onChange={handleNumberChange}
                />
              </div>
            </div>
          )
        }

        {/* // And the tags section: */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {/* {(tags || []).map((tag) => ( */}
            {/* {tags.map((tag) => ( */}
            {/* {(tags || []).map((tag) => ( */}
            {tags && tags.map((tag) => {
              const tagId = tag._id || tag.id;
              const isSelected = selectedTags.includes(tagId);
              return (
                <div
                  key={tagId}
                  className={`text-xs px-3 py-1 rounded-full cursor-pointer border transition ${isSelected
                    ? `bg-${tag.color}-500 text-white`
                    : "bg-gray-100 text-gray-700"
                    }`}
                  style={
                    // selectedTags.includes(tag._id || tag.id)
                    isSelected
                      ? { backgroundColor: tag.color }
                      : undefined
                  }
                  onClick={() => handleTagToggle(tagId)}
                >
                  {tag.name}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || isSubmitting}>
            {/* Save Changes */}
            {isLoading || isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </>
    </form>

    // // Small reusable input component
    // const InputField = ({ label, ...props }) => (
    //   <div>
    //     <label htmlFor={props.name} className="block text-sm font-medium mb-1">{label}</label>
    //     <Input id={props.name} {...props} />
    //   </div>
    // );

    // // Reusable switch component
    // const SwitchField = ({ label, checked, onChange }) => (
    //   <div className="flex items-center space-x-2">
    //     <Switch checked={checked} onCheckedChange={onChange} />
    //     <label className="text-sm font-medium">{label}</label>
    //   </div>
    // );
  )
};



FoodItemForm.propTypes = {
  food: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  categories: PropTypes.array,
  tags: PropTypes.array,
  restaurant: PropTypes.string
};

export default FoodItemForm;