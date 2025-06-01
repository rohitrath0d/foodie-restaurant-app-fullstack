const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    if (user.usertype !== "superadmin") {
      return res.status(403).send({ 
        success: false, 
        message: "Super Admin access only!" 
      });
    }

    next();
  } catch (error) {
    res.status(500).send({ 
      success: false, 
      message: "Super Admin verification failed",
      error: error.message 
    });
  }
};