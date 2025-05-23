const mongoose = require("mongoose"); // imported because -> mongoose helps in making of the schema.

// schema
const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"]
    },
    imageUrl: {
      type: String,
      // required: [true, ""]
    },
    foods:{
      type: Array,
       
    },
    time: {
      type: String,
    },
    pickup:{
      type: Boolean,
      default: true
    },
    delivery : {
      type: String,
      default: true,
    },
    isOpen:{
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: 'string'
    },
    rating:{
      type: Number,
      default:1,
      min:1,
      max:5
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String
    },
    // locations -> even can add for map.
    coords: {
      id: {type: String},
      latitude: {type: Number},
      latitudeDELTA: {type: Number},
      longitude: {type: Number},
      longitudeDELTA: {type: Number},
      address: {type: String},
      title: {type: String}
    }
  },
  { timestamps: true } // createdAt & updatedAt ki property aajayegi, jab bhi newUser create hoga
);

//export
module.exports = mongoose.model("Restaurant", restaurantSchema);
