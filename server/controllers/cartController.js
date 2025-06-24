const mongoose = require("mongoose");
const cartModel = require("../models/cartModel");
const foodModel = require("../models/foodModel"); // for checking food validity

// ✅ Add or update item in cart
const addToCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId, quantity } = req.body;

    if (!foodId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Food ID and quantity are required.",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found.",
      });
    }

    let cart = await cartModel.findOne({ user: userId });

    // If cart exists
    if (cart) {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.food.toString() === foodId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ food: foodId, quantity });
      }
    } else {
      cart = new cartModel({
        user: userId,
        items: [{ food: foodId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Item added to cart.",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding item to cart.",
      error: error.message,
    });
  }
};

// ✅ Get cart by user
const getCartByUserController = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartModel
      .findOne({ user: userId })
      .populate("items.food");

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty.",
        cart: [],
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart.",
      error: error.message,
    });
  }
};

// ✅ Update quantity of item in cart
const updateCartItemController = async (req, res) => {
  try {
    const userId = req.user.id;

    // const { foodId } = req.params;
    // const { quantity } = req.body;

    const { foodId, quantity } = req.body;

    if (!foodId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Food ID and quantity are required.",
      });
    }

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.food.toString() === foodId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Food item not found in cart.",
      });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1); // remove item
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated.",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating cart item.",
      error: error.message,
    });
  }
};


// ✅ Remove a single item from cart
const removeCartItemController = async (req, res) => {
  try {
    const userId = req.user.id;
    // const { itemId } = req.params;
    const { foodId } = req.params;

    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    // const updatedItems = cart.items.filter(
    //   (item) => item.food.toString() !== itemId
    // );
    
    const updatedItems = cart.food.filter(
      (item) => item.food.toString() !== foodId
    );

    cart.items = updatedItems;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart.",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error removing item from cart.",
      error: error.message,
    });
  }
};


// ✅ Delete entire cart
const clearCartController = async (req, res) => {
  try {
    const userId = req.user.id;

    await cartModel.findOneAndDelete({ user: userId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error clearing cart.",
      error: error.message,
    });
  }
};

module.exports = {
  addToCartController,
  getCartByUserController,
  updateCartItemController,
  removeCartItemController,
  clearCartController,
};
