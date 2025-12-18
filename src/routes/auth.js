const express = require("express");

const bcrypt = require("bcrypt");

const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // create a new instace of the user modal
  const { firstName, lastName, emailId, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save();
    res.send("user signup successfully");
  } catch (err) {
    res.status(400).send("some thing went wrong " + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).send(" Invalid credentails");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token);
      res.status(200).send("login successfully");
    } else {
      res.status(401).send(" Invalid credentials ");
    }
  } catch (error) {
    res.status(400).send("some thing went wrong " + error);
  }
});

module.exports = authRouter;
