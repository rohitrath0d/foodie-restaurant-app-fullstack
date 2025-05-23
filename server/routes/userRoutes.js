const express = require("express");
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// routes
// GET USER || GET user data.
router.get("/getUser", authMiddleware, getUserController);                 // adding middleware in auth of user routes (with jwt token)

// UPDATE PROFILE || PUT
router.put('/updateUser', authMiddleware, updateUserController);

// password update
router.post("/updatePassword", authMiddleware, updatePasswordController);

// RESET PASSWORD
router.post('/resetPassword', authMiddleware, resetPasswordController);

// delete user
router.delete('/deleteUser/:id', authMiddleware,deleteUserController);

module.exports = router;
