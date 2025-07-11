const { default: mongoose } = require("mongoose");
const foodModel = require("../models/foodModel");


const createFoodController = async (req, res) => {

  try {

    const { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating } = req.body;

    if (!title || !description || !price || !imageUrl || !foodTags || !category || !code || !isAvailable || !restaurant || !rating) {
      return res.status(400).send({
        success: false,
        message: "Please Provide all fields"
      })
    }


    // // Extract tag IDs from the foodTags array
    // const tagIds = Array.isArray(foodTags) 
    //   ? foodTags.map(tag => tag._id || tag.id)
    //   : [foodTags]; // Fallback if single tag is sent

    // Convert foodTags to proper ObjectId array
    const tagIds = foodTags.map(tag =>
      mongoose.Types.ObjectId.isValid(tag._id || tag)
        ? new mongoose.Types.ObjectId(tag._id || tag)
        : null
    ).filter(Boolean);

    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      // foodTags,
      // foodTags: tagId, // Store single tag reference
      foodTags: tagIds, // Array of tag references
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created Successfully!",
      newFood
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Food api",
      error: error.message,
    });
  }
}


const getAllFoodController = async (req, res) => {

  try {

    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No Food items was found"
      })
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Foods APi",
      error
    })
  }
}

const getFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Id"
      });
    };

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this Id",
      });
    };
    res.status(200).send({
      success: true,
      message: "Food is fetched successfully.",
      food
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Food by Id APi",
      error
    })
  }
}


// GET FOOD BY RESTAURANT ID
const getFoodByRestaurantIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }

    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on restaurant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
}


// Get Popular Foods Controller
const getPopularFoodsController = async (req, res) => {

  // try {
  //   // Get foods with highest ratings and at least 10 ratings
  //   const popularFoods = await foodModel.aggregate([
  //     {
  //       $match: {
  //         rating: { $gte: 4 }, // Minimum 4 star rating
  //         ratingCount: { $gte: 10 } // At least 10 ratings
  //       }
  //     },
  //     { $sort: { rating: -1 } }, // Sort by rating descending
  //     { $limit: 10 } // Limit to 10 results
  //   ]);

  //   if (!popularFoods || popularFoods.length === 0) {
  //     return res.status(404).send({
  //       success: false,
  //       message: "No popular foods found"
  //     });
  //   }

  //   res.status(200).send({
  //     success: true,
  //     count: popularFoods.length,
  //     popularFoods
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     success: false,
  //     message: "Error in Get Popular Foods API",
  //     error: error.message
  //   });
  // }

  try {
    const foods = await foodModel.find({}).limit(4);

    res.status(200).send({
      success: true,
      popularFoods: foods
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching popular foods",
      error: error.message
    });
  }
};

// Get Featured Foods Controller
const getFeaturedFoodsController = async (req, res) => {
  // try {
  //   // Get foods with special offers or promotions
  //   const featuredFoods = await foodModel.aggregate([
  //     {
  //       $match: {
  //         $or: [
  //           { hasCoupon: true },
  //           { isFeatured: true }
  //         ]
  //       }
  //     },
  //     { $sample: { size: 5 } } // Get 5 random featured items
  //   ]);

  //   if (!featuredFoods || featuredFoods.length === 0) {
  //     return res.status(404).send({
  //       success: false,
  //       message: "No featured foods found"
  //     });
  //   }

  //   // Format for featured carousel
  //   const formattedFoods = featuredFoods.map(food => ({
  //     id: food._id,
  //     title: food.title,
  //     tag: food.hasCoupon ? `${food.couponDiscount}% OFF` : "Featured",
  //     code: food.hasCoupon ? food.couponCode : "FEATURED",
  //     image: food.imageUrl
  //   }));

  //   res.status(200).send({
  //     success: true,
  //     count: formattedFoods.length,
  //     featuredFoods: formattedFoods
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     success: false,
  //     message: "Error in Get Featured Foods API",
  //     error: error.message
  //   });
  // }

  try {
    const foods = await foodModel.find({}).limit(4);

    res.status(200).send({
      success: true,
      popularFoods: foods
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching popular foods",
      error: error.message
    });
  }
};


const updateFoodController = async (req, res) => {

  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "No Food item Id was found",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Item Found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    if (!updatedFood) {
      return res.status(404).send({
        success: false,
        message: "Food Item cannot be updated."
      })
    }
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated.",
      updatedFood
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update Food API",
      error
    });
  }
}


const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item Deleted ",
      food
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Food APi",
      error,
    });
  }
}
module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestaurantIdController,
  getPopularFoodsController,
  getFeaturedFoodsController,
  updateFoodController,
  deleteFoodController
}