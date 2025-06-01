// middleware for admin

//  we can apply this -> where food is getting updated -> only to be done by admin

const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    // will find if the login user is admin or not.
    // check authMiddleware for knowing why commented this below line out.
    // const user = await userModel.findById(req.body.id);        // we are not directly updating id in the body, coz its a bad practice, hence we are using user to update the id in the body.
    const user = await userModel.findById(req.user.id); // req.user.id is set in authMiddleware

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }
    
    if(user.usertype !== "admin" ){
      return res.status(401).send({
        success: false,
        // message: "Access for Admin only!!!"
        message: "Admin Access Required!"
      });
    } 
    next(); // if user is admin, then call next() to proceed to the next middleware or route handler
    // else{
    //   // if admin -> simply call next()
    //   next();
    // }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Admin Verification Failed.",
      error :error.message
    });
  }
};