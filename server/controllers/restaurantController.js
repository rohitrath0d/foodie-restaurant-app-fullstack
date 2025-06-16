const restaurantModel = require("../models/restaurantModel");

// create restaurant
const createRestaurantController = async (req, res) => {
  try {
    // get data
    // const restaurantData = req.body;    // we can also do this way and later on store extracted data in this variable created here. 
    const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
        // error: error.message
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    })
    await newRestaurant.save()              // saving newRestaurant

    res.status(200).send({
      success: true,
      message: "New Restaurant created successfully!",
      newRestaurant
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurant APi",
      error: error.message,
    })

  }
}


// GET ALL RESTAURANT CONTROLLER
const getAllRestaurantsController = async (req, res) => {
  // get restaurants
  try {
    const restaurants = await restaurantModel.find({})
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurants available!",
        error: error.message,
      })
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,                            // we don't need message here, just return the totalCount, in which will restaurant's length will be given. 
      restaurants,
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Restaurant APi",
      error: error.message
    })
  }
}


//  GET RESTAURANT BY ID || GET
const getRestaurantByIdController = async (req, res) => {
  // get restaurant by ID
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide Restaurant ID",
        // error: error.message,

      })
    }
    // console.log(restaurantId);

    // if got id, then find restaurant
    const fetchRestaurant = await restaurantModel.findById(restaurantId);
    if (!fetchRestaurant) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found.",
        error: error.message
      });
    }
    // console.log(fetchRestaurant);

    res.status(200).send({
      success: true,
      message: "Restaurant Fetched by Id successfully!",
      restaurant: fetchRestaurant,
    });

  } catch (error) {
    console.log("Error in get restaurant by Id: ", error);
    res.status(500).send({
      success: false,
      message: "Error in Get Restaurant by ID APi.",
      error: error.message
    });
  };
}

// UPDATE RESTAURANT BY ID || PUT
// UPDATE RESTaURANT
const updateRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide Restaurant ID",
      });
    }
    console.log('Received update for ID:', restaurantId);

    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
      restaurantId,
      {
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
      },
      { new: true } // returns the updated document
    );
    console.log('Update data:', req.body);
    if (!updatedRestaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found or could not be updated",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurant updated successfully",
      updatedRestaurant: updatedRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update restaurant API",
      error: error.message,
    });
  }
};




//DELETE Restaurant
const deleteRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      // return res.status(404).send({    // ❌ 404 is for "Not Found"
      return res.status(400).send({ // ✅ 400 is for "Bad Request"
        success: false,
        message: "No Restaurant Found with this ID OR Provide Restaurant ID",
        // error: error.message
      });
    }
    const deletedRestaurant = await restaurantModel.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully",
      restaurant: deletedRestaurant
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete Restaurant api",
      error: error.message,     //  error: message  --> this putting up directly would be undefined. coz there's no message, so have to take reference of error object to put it up with message function
    });
  }
};


module.exports = { createRestaurantController, getAllRestaurantsController, getRestaurantByIdController, updateRestaurantController, deleteRestaurantByIdController }