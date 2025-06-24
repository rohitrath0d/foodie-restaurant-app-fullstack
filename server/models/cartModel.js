const mongoose = require("mongoose");

// cartItemSchema = structure for each individual item in the cart.
const cartItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Foods",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, "Quantity can not be less than 1."],
  },
});

// cartSchema = overall cart, holding user info and an array of items.
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    isCheckedOut: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
