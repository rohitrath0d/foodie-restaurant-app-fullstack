const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { placeOrderController, orderStatusController, getAllOrdersController, getUserOrdersController, getOrderByIdController } = require("../controllers/orderController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// getAllOrdersController - For admin to view all orders
// getUserOrdersController - For users to view their own orders
// getOrderByIdController - To view specific order details

// routes:-
// PLACE ORDER
router.post('/placeOrder', authMiddleware, placeOrderController)

// ORDER STATUS  --> change or der Status (preparing, prepared, on-the-way)
router.post("/orderStatus/:id", adminMiddleware, authMiddleware, orderStatusController)           // adminMiddleware -> only to be changed by admin. | even using authMiddleware -> that it should be authenticated too. 

router.get('/getAllOrders', authMiddleware, adminMiddleware, getAllOrdersController);
router.get('/user-orders', authMiddleware, getUserOrdersController);
router.get('/getOrderById/:id', authMiddleware, getOrderByIdController);

module.exports = router;
