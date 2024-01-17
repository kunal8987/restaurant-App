const express = require("express");
const { authentication } = require("../middleware/auth.middleware");
const {
  createFood,
  getAllFood,
  getFoodById,
  getFoodByRestaurantId,
  updateFood,
  deleteFood,
} = require("../controller/food.controller");
const foodRouter = express.Router();

//CREATE FOOD ROUTES
foodRouter.post("/create-food", authentication, createFood);

//GET ALL FOOD ROUTES
foodRouter.get("/get-all-foods", getAllFood);

//GET FOOD BY ID ROUTES
foodRouter.get("/get-food/:id", getFoodById);

//GET BY THE RESTAURANT ID ROUTES
foodRouter.get("/get-by-restaurant/:id", getFoodByRestaurantId);

//UPDATE FOOD ROUTES
foodRouter.put("/update-food/:id", authentication, updateFood);

//DELETE FOOD ROUTES
foodRouter.delete("/delete-food/:id", authentication, deleteFood);

module.exports = { foodRouter };
