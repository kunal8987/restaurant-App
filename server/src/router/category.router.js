const express = require("express");
const { authentication } = require("../middleware/auth.middleware");
const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");

const categoryRouter = express.Router();

//CREATE RESTAURANT ROUTE
categoryRouter.post("/create-category", authentication, createCategory);

//GET ALL CATEGORY ROUTE
categoryRouter.get("/get-all-categories", getAllCategory);

//UPDATE THE CATEGORY ROUTE
categoryRouter.put("/update-category/:id", authentication, updateCategory);

//DELETE CATEGORY ROUTE
categoryRouter.delete("/delete-category/:id", authentication, deleteCategory);

module.exports = { categoryRouter };