// middleware for admin

//  we can apply this -> where food is getting updated -> only to be done by admin

const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    // will find if the login user is admin or not.
    const user = await userModel.findById(req.body.id);

    if(user.usertype !== "admin" ){
      return res.status(401).send({
        success: false,
        message: "Access for Admin only!!!"
      });
    } else{
      // if admin -> simply call next()
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized Access. Admin Only.",
      error
    });
  }
};