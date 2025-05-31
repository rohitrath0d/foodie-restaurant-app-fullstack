const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, getAllCategoryCategory, updateCategoryByIdController, deleteCategoryByIdController } = require("../controllers/categoryController");

const router = express.Router();

// routes:-
// CREATE CATEGORY
// router.post('/createCategory', authMiddleware, createCategoryController);
router.post('/createCategory', createCategoryController);

// GET ALL CATEGORY
router.get("/getAllCategory", getAllCategoryCategory );

// UPDATE CATEGORY
router.put("/updateCategory/:id", authMiddleware, updateCategoryByIdController);

// DELETE CATEGORY
router.delete("/deleteCategory/:id",authMiddleware, deleteCategoryByIdController)

module.exports = router;
