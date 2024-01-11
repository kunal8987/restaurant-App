const express = require("express");
const {
  registerData,
  loginData,
  getUserData,
  updateUserData,
  passwordResetData,
  deleteAccountData,
} = require("../controller/user.controller");
const { authentication } = require("../middleware/auth.middleware");

const userRouter = express.Router();
//REGISTER ROUTES
userRouter.post("/register", registerData);

//LOGIN ROUTES
userRouter.post("/login", loginData);

//GET USER DATA ROUTES
userRouter.get("/get-user", authentication, getUserData);

//UPDATE USER DATA ROUTES
userRouter.put("/update-user", authentication, updateUserData);

//PASSWORD RESET DATA ROUTES
userRouter.post("/reset-password", authentication, passwordResetData);


//DELETE USER ACCOUNT ROUTES
userRouter.delete("/delete-user/:id", authentication,deleteAccountData)

module.exports = { userRouter };
