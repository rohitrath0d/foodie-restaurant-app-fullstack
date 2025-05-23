const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")

// GET USER INFO 
const getUserController = async (req, res) => {
    // res.status(200).send("User Data");
    // console.log(req.body.id);
    try {
        // hence upper we checked that we are getting user data and also id of user in req.body

        // find user
        const getUser = await userModel.findById({_id: req.body.id });            // id: 0  (also hiding id in the getUser response data.)
        // validation
        if(!getUser){
            return res.status(404).send({
                success: false, 
                message: "Get User not found.",
                error: error.message,
             })
        }

        //  hide password -> which we will get from user.
        getUser.password = undefined
        res.status(200).send({
            success: true, 
            message: "User Data fetched successfully!",
            getUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error: error.message,
        })
    }
    
}


const updateUserController = async(req, res) => {
    try {
        // find user
        const udpatedUser = await userModel.findById({_id: req.body.id})

        // validation
        if(!udpatedUser){
            return res.status(404).send({
                success: false,
                message: "Updated User not found"
            })
        }
        // update values:
        const {userName, email, address, phone} = req.body;                   
        if(userName) udpatedUser.userName = userName;
        if(email) udpatedUser.email = email;
        if(address) udpatedUser.address = address;
        if(phone) udpatedUser.phone = phone;

        // save user
        await udpatedUser.save();
        return res.status(200).send({
            success: true, 
            message: "User has been updated successfully!",
            udpatedUser
        })
            
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update user APi",
            error: error.message
        })        
    }
}


// update password controller
const updatePasswordController =  async(req, res) => {
     try {
        // find user
        const user  = await userModel.findById({_id: req.body.id})
        // validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User does not exist",
                error: error.message
            })
        }
        // get data
        const {oldPassword, newPassword} = req.body;
        // validation
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                succesS: false,
                message: "Please provide Old or New Password",
                error: error.message
                
            })
        }
        // compare old password and new password
        const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
        if(!isMatchPassword){
            return res.status(500).send({
                success: false, 
                message: "Invalid old password!",
                error: error.message
            })
        }
        // replacing password with newPassword
        user.password = newPassword

        // again hashing new password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(newPassword, salt);   
       user.password = hashedPassword;
        
        // saving the user
        await user.save();
        
        // sending response
        res.status(200).send({
            success: true, 
            message: "Password is updated!",
            user
        })  

     } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Password Update APi",
            error: error.message,
        })  
     }
}


// password reset -> can also be done thru email api, but we won't do it, we will update password by some specific field.
const resetPasswordController = async (req, res) => {
    try {
        // get email -> to find user based on that 
        const {email, newPassword, answer} = req.body;
        if(!email || ! newPassword || !answer){
            return res.status(500).send({
                success: false, 
                message: "Please Provide all fields",
                error: error.message,
            })            
        }
        // validation
        const user = await userModel.findOne({email, answer})
        if(!user){
            return res.status(500).send({
                success: false, 
                message: "User not found or invalid answer",
                error: error.message
                
            })
        }
        // if validation is successful -> the password will fulfill-> but again hash will be needed  
        // hashedPassword takes 2 paramters -> 1. plain password, and 2. salt function.
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword          // replacing user.password with hashedPassword
        await user.save()               // user will be saved 
        res.status(200).send({
            success: true, 
            message: "Password reset successfully!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in PASSWORD RESET APi",
            error: error.message,
        })   
    }
}

// DELETE PROFILE ACCOUNT
const deleteUserController = async(req, res) => {
    try {
        // directly deleting from the database.
        await userModel.findByIdAndDelete(req.params.id);                           // directly checking client's params and finding id in it.
        return res.status(200).send({
            success: true,
            message: "Your account has been successfully deleted! "
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false, 
            message: "Error in Delete User APi",
            error: error.message
        });
    };
};

module.exports = {getUserController, updateUserController,resetPasswordController, updatePasswordController, deleteUserController};