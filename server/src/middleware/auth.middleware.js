const jwt  = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const authentication = async (req, res, next) => {
  try {
    //DECODE AND VERIFY THE TOKEN
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    req._id = decode._id;
    //FURTHER PROCESS THROUGH NEXT
    next();

    //ERROR HANDLING
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      massage: "Authentication Error From Auth Middleware",
      error,
    });
  }
};

module.exports = {authentication}
