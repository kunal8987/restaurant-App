const express = require("express");
const { registerData, loginData } = require("../controller/user.controller");
const { authentication } = require("../middleware/auth.middleware");

const userRouter = express.Router();
//REGISTER ROUTES
userRouter.post("/register", registerData);

//LOGIN ROUTES
userRouter.post("/login", loginData);

module.exports = { userRouter };
