const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 7);
    return hashedPassword;
  } catch (error) {
    console.log(`hashed password ${error}`);
  }
};

const comparePasswords = async (passwords, hashedPassword) => {
  return bcrypt.compare(passwords, hashedPassword);
};

module.exports = { hashPassword, comparePasswords };
