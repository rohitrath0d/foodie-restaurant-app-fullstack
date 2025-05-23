const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { placeOrderController, orderStatusController } = require("../controllers/orderController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// routes:-
// PLACE ORDER
router.post('/placeOrder', authMiddleware, placeOrderController)

// ORDER STATUS  --> change or der Status (preparing, prepared, on-the-way)
router.post("/orderStatus/:id", adminMiddleware, authMiddleware, orderStatusController)           // adminMiddleware -> only to be changed by admin. | even using authMiddleware -> that it should be authenticated too. 

module.exports = router;
