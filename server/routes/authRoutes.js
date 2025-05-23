const express = require("express");
const { registerController, loginController } = require("../controllers/authController");

const router = express.Router();

// routes
// REGISTER || POST      --> why POST -> kyuki hamko client se kuch data server pe bhejna hai.
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController)

module.exports = router;
