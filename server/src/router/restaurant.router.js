const express = require("express");
const { authentication } = require("../middleware/auth.middleware");
const {
  createRestaurant,
  getAllRestaurantsData,
  getRestaurantData,
  deleteRestaurant,
} = require("../controller/restaurant.controller");

const restaurantRouter = express.Router();

//CREATE RESTAURANT ROUTE
restaurantRouter.post("/create-restaurant", authentication, createRestaurant);

//GET ALL RESTAURANT ROUTE
restaurantRouter.get("/get-all-restaurants", getAllRestaurantsData);

//GET SINGLE RESTAURANT ROUTE
restaurantRouter.get("/get-restaurants/:id", getRestaurantData);

//DELETE SINGLE RESTAURANT ROUTE
restaurantRouter.delete(
  "/delete-restaurants/:id",
  authentication,
  deleteRestaurant
);

module.exports = { restaurantRouter };
