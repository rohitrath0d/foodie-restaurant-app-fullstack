const express = require("express");
const { registerController, loginController, registerAdminController, promoteToAdminController } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
// const { superAdminMiddleware } = require("../middlewares/superAdminMiddleware");       // we have to create a function here, not extract from the following file, coz it cant be extracted from the one who is directly exporting as a function, hence name for the function has to be initialized.
const superAdminMiddleware = require("../middlewares/superAdminMiddleware");

const router = express.Router();

// routes
// REGISTER || POST      --> why POST -> kyuki hamko client se kuch data server pe bhejna hai.
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController)

// Protected admin route for creating new admins || POST
router.post(
  "/register-admin",
  authMiddleware,           // Verify JWT first
  superAdminMiddleware,   // ✅ Checks for superadmin (not adminMiddleware)
  // adminMiddleware,          // Check if requester is superAdmin
  registerAdminController
)

// Only superAdmin can promote users to admin
router.post(
  "/promote-to-admin",
  authMiddleware,
  superAdminMiddleware,
  promoteToAdminController
);


module.exports = router;
