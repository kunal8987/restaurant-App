const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// INITIALIZATION OF EXPRESS APP
const app = express();

//DOTENV CONFIG
dotenv.config();

//MIDDLEWARE
app.use(express.json());

//CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1> hello world!</h1>");
});

let PORT = process.env.PORT || 4500;
app.listen(PORT, (req, res) => {
  console.log(`server listening on ${PORT}`);
});
