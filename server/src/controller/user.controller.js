const { UserModel } = require("../models/user.model");
const { hashPassword, comparePasswords } = require("../utility/user.utility");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//REGISTER USER LOGIC
const registerData = async (req, res) => {
  try {
    // GET DATA FROM REQUEST BODY
    let { userName, password, email, address, phone } = req.body;

    //VALIDATING DATA
    if (!userName || !password || !email || !phone) {
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
        existingUser,
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
    });
    user.save();
    return res.status(200).send({
      success: true,
      massage: "User Registration Success",
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

module.exports = {
  registerData,
  loginData,
};
