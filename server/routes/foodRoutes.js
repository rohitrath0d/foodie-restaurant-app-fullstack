const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodController, getFoodByIdController, getFoodByRestaurantIdController, updateFoodController, deleteFoodController, getPopularFoodsController, getFeaturedFoodsController } = require("../controllers/foodController");

const router = express.Router();

// routes:-

// CREATE FOOD  
router.post("/createFood", authMiddleware, createFoodController)

// GET ALL FOOD
router.get("/getAllFood/", getAllFoodController);
router.get("/getFoodById/:id", getFoodByIdController);
router.get("/getFoodByRestaurantId/:id", getFoodByRestaurantIdController);
router.get('/getPopularFoods', getPopularFoodsController);
router.get('/getFeaturedFoods', getFeaturedFoodsController);
router.put("/updateFood/:id", authMiddleware, updateFoodController)
router.delete("/deleteFood/:id", authMiddleware, deleteFoodController)


module.exports = router;
