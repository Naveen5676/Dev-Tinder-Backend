const express = require("express");

const profileRouter = express.Router();

const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

// using mongoose findById
profileRouter.get("/user", userAuth, async (req, res) => {
  try {
    const user = req.user;

    // Get user from DB
    const userInfo = await User.findById(user._id);

    if (!userInfo) {
      return res.status(404).send("User not found");
    }

    // Send user data
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});

module.exports = profileRouter;
