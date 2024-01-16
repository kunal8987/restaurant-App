//CREATE RESTAURANT FUNCTION

const { RestaurantModel } = require("../models/restaurent.model");

const createRestaurant = async (req, res) => {
  try {
    let {
      title,
      imageUrl,
      foods,
      time,
      address,
      code,
      pickUp,
      delivery,
      isOpen,
      coordinate,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !address || !imageUrl) {
      return res.status(404).send({
        success: false,
        massage: "Title Address And Image Is Required",
      });
    }

    let newRestaurant = new RestaurantModel({
      title,
      imageUrl,
      foods,
      time,
      address,
      code,
      pickUp,
      delivery,
      isOpen,
      coordinate,
      rating,
      ratingCount,
    });

    await newRestaurant.save();
    return res.status(200).send({
      success: true,
      massage: "Restaurants Created Successfully",
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From Create Restaurant Function Restaurant Controller",
      error,
    });
  }
};

// GET ALL THE RESTAURANT FUNCTIONS

const getAllRestaurantsData = async (req, res) => {
  try {
    let restaurants = await RestaurantModel.find();
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        massage: "No Restaurant Found",
      });
    }

    return res.status(200).send({
      success: true,
      restaurantCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From Get All Restaurant Function Restaurant Controller",
      error,
    });
  }
};

// GET SINGLE RESTAURANT FUNCTION

const getRestaurantData = async (req, res) => {
  try {
    let restaurant = await RestaurantModel.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        massage: "No Restaurant Found",
      });
    }
    return res.status(200).send({
      success: true,
      massage: "Restaurant Found",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage:
        "Error From Get Single Restaurant Function Restaurant Controller",
      error,
    });
  }
};

//DELETE RESTAURANT FUNCTION

const deleteRestaurant = async (req, res) => {
  try {
    let restaurant = await RestaurantModel.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        massage: "No Restaurant Found",
      });
    }
    return res.status(200).send({
      success: true,
      massage: "Restaurant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From Delete Restaurant Function Restaurant Controller",
      error,
    });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurantsData,
  getRestaurantData,
  deleteRestaurant,
};
