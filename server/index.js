const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./db");
const { userRouter } = require("./src/router/userRouter");
const { restaurantRouter } = require("./src/router/restaurant.router");
const { categoryRouter } = require("./src/router/category.router");
const { foodRouter } = require("./src/router/food.router");

// INITIALIZATION OF EXPRESS APP
const app = express();

//DOTENV CONFIG
dotenv.config();

//MIDDLEWARE
app.use(express.json());

//CORS
app.use(cors());

//ROUTES

app.use("/users", userRouter);

//RESTAURANT ROUTE
app.use("/restaurants", restaurantRouter);

//CATEGORY ROUTE
app.use("/category", categoryRouter);

//FOOD ROUTE
app.use("/foods", foodRouter);
app.get("/", (req, res) => {
  res.send("<h1> hello world!</h1>");
});

let PORT = process.env.PORT || 4500;
app.listen(PORT, (req, res) => {
  connection();
  console.log(`server listening on ${PORT}`);
});
