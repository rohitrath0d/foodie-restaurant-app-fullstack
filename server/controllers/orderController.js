const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const placeOrderController = async (req, res) => {
  try {
    // user can place order from cart directly -> so that, he can get listed items in cart
    // we can also use payment gateway, if using it, we get data from it, and have to use it's endpoints.
    // const {cart, payment} = req.body; 
    const { cart } = req.body;                          // removing payment and validation coz we'll get it directly.
    // if(!cart || !payment){
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please add food cart or payment method"
      })
    }
    let total = 0                         // initial value of price is 0
    // calculate price
    cart.map((i) => {
      total += i.price                        // every item on cart has price, and will calculate all item's price here.
    })

    // when calculation will be done, we will deal with orderModel
    const newOrder = new orderModel({                                         //instead of await, we will create a new instance which will directly store an order object ({foods: cart})
      foods: cart,                                   // will add fod's array to cart (which we will get from user)
      payment: total,                                       // will get payment
      buyer: req.body.id                            // will get user id 
    })

    await newOrder.save()                                 // IMPORTANT we have to save explicitly, otherwise ye database mai store nahi hoga 
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully!",
      newOrder,
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Place Order APi",
      error
    })
  }
}


// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    // get orderId from user
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid Order Id."
      })
    }

    // as soon as we get orderId, we'll change the order status
    const { status } = req.body
    if (!status) {
      return res.status(404).send({
        success: false,
        message: "Order Status cannot be changed."
      });
    };

    // updating order
    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).send({
      success: true,
      message: "Order Status updated successfully!"
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order Status APi",
      error
    })

  }

}

module.exports = { placeOrderController, orderStatusController }