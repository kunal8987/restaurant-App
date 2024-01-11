const express = require("express");
const { authentication } = require("../middleware/auth.middleware");
const { createRestaurant } = require("../controller/restaurant.controller");

const restaurantRouter = express.Router();

//CREATE RESTAURANT ROUTE
restaurantRouter.post("/create-restaurant", authentication, createRestaurant);

module.exports = { restaurantRouter };
