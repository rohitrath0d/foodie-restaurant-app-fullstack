const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    // ✅ Now correctly reads from `req.user.id` (set by authMiddleware)
    const user = await userModel.findById(req.user.id);      // has to be Consistent with the req.user.id as in adminMiddleware.js || and req.user = {id: decode.id}
    if (!user) {
      return res.status(404).send({ 
        success: false,
        message: "User not found" 
      });
    }

    if (user.usertype !== "superadmin") {
      return res.status(403).send({ 
        success: false, 
        message: "Super Admin access required!" 
      });
    }

    next();
  } catch (error) {
    console.error("Superadmin verification error:", error),
    res.status(500).send({ 
      success: false, 
      message: "Super Admin verification failed",
      error: error.message 
    });
  }
};