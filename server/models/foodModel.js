const mongoose = require("mongoose");                 // imported because -> mongoose helps in making of the schema.

// schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required."]
    },
    description: {
      type: String,
      required: [true, "Food description is required"]
    },
    price: {
      type: Number,
      required: [true, "Food price is required."]
    },
    imageUrl: {
      type: String,
      default: "https://png.pngtree.com/png-vector/20220701/ourmid/pngtree-fast-food-logo-png-image_5573657.png"
    },
    foodTags:{
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    ratingCount:{
      type: String
    },
  },
  { timestamps: true }                         // createdAt & updatedAt ki property aajayegi, jab bhi newUser create hoga
);

//export
module.exports = mongoose.model("Foods", foodSchema);
