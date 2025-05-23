const mongoose = require("mongoose");                 // imported because -> mongoose helps in making of the schema.

// schema
const orderSchema = new mongoose.Schema(
  {
    // adding Foods as array because, we can have multiple food objects here.
    foods: [
      // building a relationship here. of foods from the objectId of foods which takes it reference name too : "Foods"
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods"
      },
    ],
    payment: {},                                // can add payment gateway here:  such as Payment Mode, Payment Type, etc
    buyer: {  
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: ['preparing', 'prepared', 'on-the-way', 'delivered'],
      default: "preparing",
    },
  },
  { timestamps: true }                         // createdAt & updatedAt ki property aajayegi, jab bhi newUser create hoga
);

//export
module.exports = mongoose.model("Orders", orderSchema);
