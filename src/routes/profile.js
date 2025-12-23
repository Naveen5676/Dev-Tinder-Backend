const express = require("express");

const profileRouter = express.Router();

const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");

// using mongoose findById
profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid edit payload request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.status(200).send({
      message: "Data saved successfully",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error" + error);
  }
});

module.exports = profileRouter;
