const mongoose = require("mongoose"); // imported because -> mongoose helps in making of the schema.

// schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
      // unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "password is required"],
      unique: true,
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s",
    },
    answer:{
      type: String,
      required: [true, "Answer is required!"]
    }
  },
  { timestamps: true } // createdAt & updatedAt ki property aajayegi, jab bhi newUser create hoga
);

//export
module.exports = mongoose.model("User", userSchema);
