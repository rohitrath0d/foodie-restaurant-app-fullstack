const express = require("express");
const { registerController, loginController, registerAdminController, promoteToAdminController } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { superAdminMiddleware } = require("../middlewares/superAdminMiddleware");

const router = express.Router();

// routes
// REGISTER || POST      --> why POST -> kyuki hamko client se kuch data server pe bhejna hai.
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController)

// Protected admin route for creating new admins || POST
router.post(
  "/register-admin",
  authMiddleware,
  adminMiddleware, 
  registerAdminController
)

// Only superadmin can promote users to admin
router.post(
  "/promote-to-admin",
  authMiddleware,
  superAdminMiddleware,
  promoteToAdminController
);


module.exports = router;
