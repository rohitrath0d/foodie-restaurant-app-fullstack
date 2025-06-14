const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

// register controller:-
const registerController = async (req, res) => {
  try {
    // here, for register -> we have to get some data for user.
    // and hence for this purpose, we use req -> from (req,res)
    // destructuring data from req here in req.body
    // req -> has header part & body part. headers -> metadata -> such as token, site url, etc.    body -> visible part -> such as form data
    const { userName, email, password, phone, address, answer } = req.body;
    // validation -> because in schema we have initialized some fields as 'required' -> and hence validation check is important for that.
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        // 500 status code is for internal server error.
        success: false,
        message: "Please provide all required fields",
      });
    }

    // if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already exists. Please try Log in.",
      });
    }

    // hashing password
    // salt -> read bcryptjs docs -> salt is a function provided by bycryptjs -> encrypts the password
    // hashedPassword takes 2 paramters -> 1. plain password, and 2. salt function.
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user:
    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Registration is successfully done!",
      newUser, // displaying user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    // for login we only need email & password
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Email and Password is required",
        // error,
      })
    }
    // check user
    const loginUser = await userModel.findOne({ email });
    if (!loginUser) {
      return res.status(404).send({
        success: false,
        // message: "User doesn't exist. Please register.",      // for password also we have to provide separate validation -> lets do it later -> Done. check the isMatchPassword function
        message: "User does not exist. Please register.",
      })
    }

    // check user password | compare password | decrypt the password (hashed at the time of registration) -> now decrypt at the time of login.
    // it takes 2 params -> 1. plain password 2. user that is getting the password
    const isMatchPassword = await bcrypt.compare(password, loginUser.password)
    // validation for password check.
    if (!isMatchPassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials"
      })
    }

    // token
    const token = JWT.sign({ id: loginUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // console.log(token);


    loginUser.password = undefined;

    // if all the above response, is successful, then send the login response.
    res.status(200).send({
      success: true,
      message: "User login successfully done!",
      token,
      loginUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login APi",
      error: error.message
    })
  }
}

// we can also create a login controller on the backend.



// Controller for admin registration
const registerAdminController = async (req, res) => {
  try {
    // only existing admins can create new admins
    const { userName, email, password, phone, address, answer } = req.body;

    // validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    // If user exists AND isn't an admin, upgrade them to admin
    if (existingUser) {
      // return res.status(400).send({
      //   success: false,
      //   message: "User already exists. Please try Log in.",
      // });
      if (existingUser.usertype === "admin" || existingUser.usertype === "superadmin") {
        return res.status(409).json({
          success: false,
          message: "Admin with this email already exists",
        });
      }

      // Upgrade normal user to admin
      existingUser.usertype = "admin";
      existingUser.userName = userName;
      // Update other fields if needed
      await existingUser.save();

      return res.status(200).send({
        success: true,
        message: "Existing user promoted to admin",
        user: existingUser,
      });
    }

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
      usertype: 'admin'
    });

    newAdmin.password = undefined;         // Never return password

    res.status(201).send({
      success: true,
      message: "Admin registered successfully",
      newAdmin,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Admin Registration API",
      error: error.message
    })

  }
}


// /register-admin: Creates brand new admin accounts (with all required fields)
// promote-to-admin: Upgrades existing normal users to admins (only needs email/userID)

// Add this new controller (only accessible by superadmin)
const promoteToAdminController = async (req, res) => {
  try {
    const { email } = req.body;           // // also can use userId

    // Validate requestor is superAdmin (already checked by middleware)
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email ID to promote is required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }


    // / Find and update the user
    // const user = await userModel.findByIdAndUpdate(
    //   userIdToPromote,
    //   { $set: { usertype: "admin" } },
    //   { new: true } // Return updated user
    // );


    // if (!user) {
    //   return res.status(404).json({ 
    //     success: false, 
    //     message: "User not found" 
    //   });
    // }

    // res.status(200).json({
    //   success: true,
    //   message: "User promoted to admin successfully",
    //   user
    // });


    // if (user.usertype !== "user") { // Only promote normal users
    //   return res.status(400).json({
    //     success: false,
    //     message: "User already has elevated privileges",
    //   });
    // }

    if (user.usertype === "admin" || user.usertype === "superadmin") {
      return res.status(400).send({
        success: false,
        message: "User is already an admin/superadmin",
      });
    }

    user.usertype = "admin";
    await user.save();


    // Optional: Send promotion email here
    // await sendAdminPromotionEmail(user.email, user.userName);


    res.status(200).send({
      success: true,
      message: "User promoted to admin successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in promoting user",
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController, registerAdminController, promoteToAdminController };
