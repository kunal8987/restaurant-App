//CREATE FOOD FUNCTION

const { FoodModel } = require("../models/food.model");

const createFood = async (req, res) => {
  try {
    let {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(404).send({
        success: false,
        massage: "Please Provide All Fields",
      });
    }

    let newFood = await FoodModel.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    newFood.save();

    return res.status(200).send({
      success: true,
      massage: "Food Registered Successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      massage: "Error From Create Food Function Food Controller",
      error,
    });
  }
};

//GET ALL FOOD FUNCTIONS

const getAllFood = async (req, res) => {
  try {
    let foods = await FoodModel.find();
    if (foods) {
      return res.status(200).send({
        success: true,
        massages: "All Food Get Successfully",
        foods,
      });
    } else {
      return res.status(404).send({
        success: false,
        massages: "No Foods Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      massage: "Error From Get All Food Function Food Controller",
      error,
    });
  }
};

//GET FOOD BY ID FUNCTIONS

const getFoodById = async (req, res) => {
  try {
    let foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        massages: "Food Id Is Missing ",
      });
    }

    let foods = await FoodModel.findById(foodId);
    if (foods) {
      return res.status(200).send({
        success: true,
        massages: " Food Get Successfully",
        foods,
      });
    } else {
      return res.status(404).send({
        success: false,
        massages: "No Food Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      massage: "Error From Get Food By Id Function Food Controller",
      error,
    });
  }
};

//GET FOOD BY RESTAURANT ID FUNCTION

const getFoodByRestaurantId = async (req, res) => {
  try {
    let restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        massages: "Restaurant Id Is Missing ",
      });
    }

    let foods = await FoodModel.find({ restaurant: restaurantId });
    if (foods) {
      return res.status(200).send({
        success: true,
        massages: " Food Get Successfully",
        foodCount: foods.length,
        foods,
      });
    } else {
      return res.status(404).send({
        success: false,
        massages: "No Food Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      massage: "Error From Get Food By Restaurant Id Function Food Controller",
      error,
    });
  }
};

// UPDATE FOOD ITEM FUNCTION

const updateFood = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "No Food Id Was Found",
      });
    }
    const food = await FoodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    const updatedFood = await FoodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error From Update Food Function Food Controller",
      error,
    });
  }
};

// DELETE FOOD FUNCTION

const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Provide Food Id",
      });
    }
    const food = await FoodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found With Id",
      });
    }
    await FoodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item Deleted ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error From Delete Food Function Food Controller",
      error,
    });
  }
};

module.exports = {
  createFood,
  getAllFood,
  getFoodById,
  getFoodByRestaurantId,
  updateFood,
  deleteFood
};
