const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, getAllRestaurantsController, getRestaurantByIdController, deleteRestaurantByIdController, updateRestaurantController } = require("../controllers/restaurantController");

const router = express.Router();

// routes
// CREATE RESTAURANT || POST
router.post('/createRestaurant', authMiddleware, createRestaurantController);

// GET ALL RESTAURANTS || GET
router.get("/getAllRestaurants", getAllRestaurantsController);

// Fetching a Single restaurant
// GET RESTAURANT BY ID || GET
router.get("/getRestaurantById/:id", getRestaurantByIdController)

// UPDATE RESTAURANT BY ID || PUT 
router.put("/updateRestaurantById/:id", authMiddleware, updateRestaurantController)

// DELETE RESTAURANT BY ID || DELETE
router.delete("/deleteRestaurantById/:id", authMiddleware, deleteRestaurantByIdController)

module.exports = router;
