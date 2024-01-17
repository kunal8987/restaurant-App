const { CategoryModel } = require("../models/category.model");

//CREATE CATEGORY FUNCTION
const createCategory = async (req, res) => {
  try {
    let { title, imageUrl } = req.body;
    if (!title) {
      return res.status(404).send({
        success: false,
        massage: "Title Is Required",
      });
    }
    let newCategory = await CategoryModel.create({ title, imageUrl });
    newCategory.save();
    return res.status(200).send({
      success: true,
      massage: "Category Created Successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error From Create Category Function Category Controller ",
      error,
    });
  }
};

//GET ALL CATEGORY FUNCTIONS
const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories found",
      });
    }
    return res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error From Get All Category Function Category Controller",
      error,
    });
  }
};

//UPDATE CATEGORY FUNCTION

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    let category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No Category Found",
      });
    }
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error From Update Category Function Category Controller",
      error,
    });
  }
};

//DELETE CATEGORY FUNCTION

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Category ID",
      });
    }
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No Category Found With This ID",
      });
    }
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error From Delete Category Function Category Controller",
      error,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
