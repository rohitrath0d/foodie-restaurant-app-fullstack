const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodController, getFoodByIdController, getFoodByRestaurantIdController, updateFoodController, deleteFoodController } = require("../controllers/foodController");

const router = express.Router();

// routes:-

// CREATE FOOD  
router.post("/createFood", authMiddleware, createFoodController)

// GET ALL FOOD
router.get("/getAllFood/", getAllFoodController);
router.get("/getFoodById/:id", getFoodByIdController);
router.get("/getFoodByRestaurantId/:id", getFoodByRestaurantIdController);
router.put("/updateFood/:id", authMiddleware, updateFoodController)
router.delete("/deleteFood/:id", authMiddleware, deleteFoodController)


module.exports = router;
