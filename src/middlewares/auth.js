const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error(" Invalid Token ");
    }

    const decodeData = await jwt.verify(token, "DevTineder@1234");

    // console.log("decodeData", decodeData);

    const user = await User.findById(decodeData._id);

    // console.log('user', user)

    if (!user) {
      throw new Error(" User not found ");
    }

    req.user = user

    next();
  } catch (err) {
    res.status(400).send("error" + err);
  }
};

module.exports = { userAuth };
