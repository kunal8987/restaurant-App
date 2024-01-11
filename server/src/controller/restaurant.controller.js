//CREATE RESTAURANT FUNCTION

const { RestaurantModel } = require("../models/restaurent.model");

const createRestaurant = async (req, res) => {
  try {
    let {
      title,
      imageUrl,
      food,
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
      food,
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


module.exports ={createRestaurant}