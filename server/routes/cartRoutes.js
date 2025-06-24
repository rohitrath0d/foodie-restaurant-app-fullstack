const express = require("express");
const router = express.Router();
const {
  addToCartController,
  getCartByUserController,
  updateCartItemController,
  clearCartController,
  removeCartItemController
} = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/addToCart", authMiddleware, addToCartController);
router.get("/getCartByUser", authMiddleware, getCartByUserController);
// router.put("/updateCartItem/:foodId", authMiddleware, updateCartItemController);
router.put("/updateCartItem", authMiddleware, updateCartItemController);
router.delete("/removeCartItem/:foodId", authMiddleware, removeCartItemController);
router.delete("/clearCart", authMiddleware, clearCartController);

module.exports = router;
