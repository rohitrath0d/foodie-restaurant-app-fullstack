/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../..//components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { useFoodStore } from "../../store/useFoodStore";
import { Card, CardContent } from "../../components/ui/card";


const FoodItemForm = ({ food, onSuccess, onCancel, categories, tags, restaurantId }) => {     // prop destructuring mai we have to add {} in the props used.
  const { createFood, updateFood, isLoading, error } = useFoodStore();

  const [selectedTags, setSelectedTags] = useState([]);

  // const [category, setCategory] = useState([]); // ✅ not undefined



  const [editedItem, setEditedItem] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    foodTags: [],
    category: "",
    code: "",
    isAvailable: false,
    restaurant: restaurantId || "",
    rating: 0,

    // check if this fields exists on schema.
    hasCoupon: false,
    couponCode: "",
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
      setEditedItem({
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
        restaurant: food.restaurant || restaurantId || "",
        hasCoupon: !!food.couponCode || '',              // make this available in schema design
        couponCode: food.couponCode || "",
        couponDiscount: food.couponDiscount || 0,
      });

      // const tagIds = food.foodTags?.map(tag => tag.id) || [];
      // setSelectedTags(tagIds);
      setSelectedTags(food.foodTags?.map(tag => tag.id) || []);

    } else {
      // Create mode - reset to defaults
      setEditedItem({
        title: "",
        description: "",
        price: 0,
        imageUrl: "",
        foodTags: [],
        category: "",
        code: "",
        isAvailable: false,
        restaurant: restaurantId || "",
        rating: 0,
        hasCoupon: false,
        couponCode: "",
        couponDiscount: 0,
      });
      setSelectedTags([])

    }
  }, [food, restaurantId]);                                                     // missing dependency on restaurantId added.


  // const [selectedTags, setSelectedTags] = useState(
  //   foods ? foods.foodTags.map((tag) => tag.id) : []
  // );

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setEditedItem({ ...editedItem, [name]: value });
    setEditedItem((prev) => ({ ...prev, [name]: value }));

  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // setEditedItem({ ...editedItem, [name]: parseFloat(value) || 0 });
    setEditedItem((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));

    // };
  };
  // 

  // const handleAvailabilityChange = (checked: boolean) => {
  const handleAvailabilityChange = (checked) => {
    // setEditedItem({ ...editedItem, isAvailable: checked });
    setEditedItem((prev) => ({ ...prev, isAvailable: checked }));

  };

  // const handleCouponChange = (checked: boolean) => {
  const handleCouponChange = (checked) => {
    setEditedItem((prev) => ({
      // ...editedItem,
      ...prev,
      hasCoupon: checked,
      // couponCode: checked ? editedItem.couponCode : "",
      couponCode: checked ? prev.couponCode : "",

      // couponDiscount: checked ? editedItem.couponDiscount : 0,
      couponDiscount: checked ? prev.couponDiscount : 0,

    }));
  };

  // Fix the TypeScript error by creating a specific handler for select elements
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    // setEditedItem({ ...editedItem, categoryId: value });
    setEditedItem((prev) => ({ ...prev, category: value }));

  };

  const handleTagToggle = (tagId) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];

    setSelectedTags(newSelectedTags);

    const selectedTagObjects = tags.filter((tag) => newSelectedTags.includes(tag.id)
    );

    // setEditedItem({ ...editedItem, foodTags: selectedTagObjects });
    setEditedItem((prev) => ({ ...prev, foodTags: selectedTagObjects }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    if (food?.id) {
      success = await updateFood(food.id, editedItem);              // have to check if it accepts id or _id

    } else {
      success = await createFood(
        editedItem.title,
        editedItem.description,
        editedItem.price,
        editedItem.imageUrl,
        editedItem.foodTags,
        editedItem.category,
        editedItem.code,
        editedItem.isAvailable,
        editedItem.restaurant,
        editedItem.rating,
      );
    }
    if (success && onSuccess) {
      onSuccess();
    }
  };


  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Item Name
            </label>
            <Input
              id="title"
              name="title"
              value={editedItem.title || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                value={editedItem.price}
                onChange={handleNumberChange}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={editedItem.category}       //  Changed from categoryId
                onChange={handleCategoryChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Select a category</option>
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={editedItem.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Image URL
            </label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={editedItem.imageUrl || ''}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isAvailable"
                checked={editedItem.isAvailable}
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
                checked={editedItem.hasCoupon}
                onCheckedChange={handleCouponChange}
              />
              <label htmlFor="hasCoupon" className="text-sm font-medium">
                Has Coupon
              </label>
            </div>
          </div>

          {editedItem.hasCoupon && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="couponCode" className="block text-sm font-medium mb-1">
                  Coupon Code
                </label>
                <Input
                  id="couponCode"
                  name="couponCode"
                  value={editedItem.couponCode}
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
                  value={editedItem.couponDiscount}
                  onChange={handleNumberChange}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {(tags || []).map((tag) => (
                <div
                  key={tag.id}
                  className={`text-xs px-3 py-1 rounded-full cursor-pointer ${selectedTags.includes(tag.id)
                    ? `bg-${tag.color} text-white`
                    : "bg-gray-100 text-gray-700"
                    }`}
                  style={
                    selectedTags.includes(tag.id)
                      ? { backgroundColor: tag.color }
                      : undefined
                  }
                  onClick={() => handleTagToggle(tag.id)}
                >
                  {tag.name}
                </div>
              ))};
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {/* Save Changes */}
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

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
};
export default FoodItemForm;