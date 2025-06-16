const mongoose = require("mongoose"); // imported because -> mongoose helps in making of the schema.

// schema
const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
      trim: true

    },
    imageUrl: {
      type: String,
      // required: [true, ""]
    },
    foods: [{
      // type: Array,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    }],
    time: {
      type: String,
      default: "30-40 min"
    },
    pickup: {
      type: Boolean,
      default: true
    },
    delivery: {
      type: String,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: 'string'
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5
    },
    ratingCount: {
      type: Number,
      default: 100
    },
    code: {
      type: String,
      default: "IN",
      uppercase: true,
      trim: true
    },
    // locations -> even can add for map.
    coords: {
      // id: { type: String },
      // latitude: { type: Number },
      // latitudeDELTA: { type: Number },
      // longitude: { type: Number },
      // longitudeDELTA: { type: Number },
      // address: { type: String },
      // title: { type: String }

      lat: {  // Changed from latitude to match frontend
        type: Number,
        required: true
      },
      lng: {  // Changed from longitude to match frontend
        type: Number,
        required: true
      },
      address: {
        type: String,
        default: ""
      },
      // Removed DELTA fields if not needed
      // Added name to match your form
      name: {
        type: String,
        default: ""
      }
    }
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true }

  } // createdAt & updatedAt ki property aajayegi, jab bhi newUser create hoga
);

// Add any virtuals or methods if needed
// restaurantSchema.virtual('fullAddress').get(function() {
//   return `${this.coords.address}, ${this.coords.name}`;
// });


//export
module.exports = mongoose.model("Restaurant", restaurantSchema);
