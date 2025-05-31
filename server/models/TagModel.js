const mongoose = require("mongoose"); // imported because -> mongoose helps in making of the schema.

// schema
const TagSchema = new mongoose.Schema(
 {
  name: {
    type: String,
    required: [true, "Tag name is required"],
    unique: true,
    trim: true,
    maxlength: [30, 'Tag name cannot exceed 30 characters' ] // max length of tag name
  },
  color: {
    type: String,
    required: [true, "Tag color is required"],
     validate: {
        validator: (value) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value),
        message: "Invalid hex color code",
      },
    default: "#000000", 
  },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Admin", // assuming you have an Admin model
  //   required: true,
  // },
   // 🔑 Key Changes Below
  // restaurants: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Restaurant",
  // }],
  // isGlobal: {
  //   type: Boolean,
  //   default: false, // If true, tag is shared across all restaurants
  // },
},
  { timestamps: true } // createdAt & updatedAt ki property aajayegi, jab bhi newUser create hoga
);


// Compound Index: Tag names must be unique per admin (unless global)
TagSchema.index(
  { name: 1, createdBy: 1 },
  { 
    unique: true,
    partialFilterExpression: { isGlobal: false }, // Only enforce uniqueness for non-global tags
    collation: { locale: "en", strength: 2 } // Case-insensitive
  }
);

//export
module.exports = mongoose.model("Tags", TagSchema);
