const { UserModel } = require("../models/user.model");
const { hashPassword, comparePasswords } = require("../utility/user.utility");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//REGISTER USER LOGIC
const registerData = async (req, res) => {
  try {
    // GET DATA FROM REQUEST BODY
    let { userName, password, email, address, phone, answer } = req.body;

    //VALIDATING DATA
    if (!userName || !password || !email || !phone || !answer) {
      return res.status(404).send({
        success: false,
        massage: "Please Fill All The Details Below",
      });
    }
    // CHECKING EXISTING USER
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        massage: "User Already Exists",
        // existingUser,
      });
    }

    //CREATING NEW USER AND HASHING THE PASSWORD

    let hashedPassword = await hashPassword(password);

    let user = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    user.save();
    user.password = undefined;
    return res.status(200).send({
      success: true,
      massage: "User Registration Successfully",
      user,
    });

    // HANDLING ERROR
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From Register Data User Controller ",
      error,
    });
  }
};

// LOGIN USER LOGIC
const loginData = async (req, res) => {
  try {
    let { email, password } = req.body;

    //VALIDATING DATA
    if (!password || !email) {
      return res.status(404).send({
        success: false,
        massage: "Please Fill All The Details Below",
      });
    }

    //FINDING THE USER FROM DATABASE

    let user = await UserModel.findOne({ email });

    //MATCHING THE HASH PASSWORD
    let match = await comparePasswords(password, user.password);

    if (!match) {
      return res.status(404).send({
        success: false,
        massage: "Wrong Password",
      });
    }
    //IF USER NOT FOUND THEN
    if (!user) {
      return res.status(404).send({
        success: false,
        massage: "User Not Found",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "2d",
    });
    //IF USER FOUND
    //REMOVE PASSWORD FIELD FROM RESPONSE DATA
    user.password = undefined;
    return res.status(200).send({
      success: true,
      massage: "User Login Successfully",
      token: token,
      user,
    });

    //HANDLING ERROR
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From Login Data User Controller ",
      error,
    });
  }
};

//GET USER DATA FUNCTION

const getUserData = async (req, res) => {
  try {
    let user = await UserModel.findById({ _id: req._id });
    if (!user) {
      return res.status(404).send({
        success: false,
        massage: "User Not Found ",
      });
    }

    //HIDING THE PASSWORD
    user.password = undefined;

    //GET RESPONSE
    return res.status(200).send({
      success: true,
      massage: "User Found Successfully",
      user,
    });
    // console.log(req._id);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From get User Data Function User Controller ",
      error,
    });
  }
};

//UPDATE USER DATA FUNCTION
const updateUserData = async (req, res) => {
  try {
    let user = await UserModel.findById({ _id: req._id });
    if (!user) {
      return res.status(404).send({
        success: false,
        massage: "User Not Found ",
      });
    }

    //UPDATING USER DATA
    let { userName, phone, address } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();
    //HIDING THE PASSWORD
    user.password = undefined;

    //GET RESPONSE
    return res.status(200).send({
      success: true,
      massage: "User Update Successfully",
      user,
    });
    // console.log(req._id);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From Update User Data Function User Controller ",
      error,
    });
  }
};

//PASSWORD RESET FUNCTION
const passwordResetData = async (req, res) => {
  try {
    //GETTING FROM REQ BODY
    let { email, newPassword, answer } = req.body;

    //VALIDATE THE USER
    if (!email || !newPassword || !answer) {
      return res.status(404).send({
        success: false,
        massage: "Please Fill All The Details Below",
      });
    }

    //FINDING THE USER
    let user = await UserModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        massage: "User Not Found Or Wrong Answer",
      });
    }
    //HASH THE PASSWORD
    let hashedPassword = await hashPassword(newPassword);

    //UPDATE THE PASSWORD
    user.password = hashedPassword;
    await user.save();
    //GET RESPONSE
    return res.status(200).send({
      success: true,
      massage: "User Password Update Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From Password Reset Data Function User Controller ",
      error,
    });
  }
};

//DELETE USER ACCOUNT OR PROFILE
const deleteAccountData = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      massage: "Your Account Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From Delete Account Data Function User Controller ",
      error,
    });
  }
};

module.exports = {
  registerData,
  loginData,
  getUserData,
  updateUserData,
  passwordResetData,
  deleteAccountData,
};
