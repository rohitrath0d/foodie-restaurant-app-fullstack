const mongoose = require("mongoose");                 // imported because -> mongoose helps in making of the schema.

// schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required."]
    },
    imageUrl:{
      type: String,
      default: "https://png.pngtree.com/png-vector/20220701/ourmid/pngtree-fast-food-logo-png-image_5573657.png"
    }
  },
  { timestamps: true }                         // createdAt & updatedAt ki property aajayegi, jab bhi newUser create hoga
);

//export
module.exports = mongoose.model("Category", categorySchema);
