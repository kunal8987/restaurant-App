const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log(`server is connected to database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Error From Db File ${error}`);
  }
};

module.exports = { connection };
