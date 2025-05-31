// tag routes

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createTagController, getAllTagsController, getTagByIdController,updateTagController,deleteTagController } = require("../controllers/tagController");

const router = express.Router();

// routes
// CREATE Tag || POST
// router.post('/createTag', authMiddleware, createTagController);
router.post('/createTag', createTagController);


// GET ALL TAG || GET
router.get("/getAllTags", getAllTagsController)   

// Fetching a Single Tag by particular admin
// GET TAG BY ID || GET
router.get("/getTagById/:id", authMiddleware, getTagByIdController);

// UPDATE TAG BY ID || PUT 
router.put("/updateTag/:id", authMiddleware, updateTagController);

// DELETE TAG BY ID || DELETE
router.delete("/deleteTag/:id", authMiddleware, deleteTagController);

module.exports = router;
