const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, getAllCategoryCategory, updateCategoryByIdController, deleteCategoryByIdController } = require("../controllers/categoryController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// routes:-
// CREATE CATEGORY
// router.post('/createCategory', authMiddleware, createCategoryController);

// First verify the JWT token (authMiddleware)
// Then check if the user is admin (adminMiddleware)
router.post(
  '/createCategory',
  authMiddleware,    // First verify token
  adminMiddleware,   // Then check if admin
   createCategoryController);

// GET ALL CATEGORY
router.get("/getAllCategory", getAllCategoryCategory );

// UPDATE CATEGORY
router.put("/updateCategory/:id", authMiddleware, updateCategoryByIdController);

// DELETE CATEGORY
router.delete("/deleteCategory/:id",authMiddleware, deleteCategoryByIdController)

module.exports = router;
