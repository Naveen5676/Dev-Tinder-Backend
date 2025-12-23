const express = require("express");

const bcrypt = require("bcrypt");

const User = require("../models/user");

const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  // create a new instace of the user modal
  const { firstName, lastName, emailId, password } = req.body;

  try {
    validateSignUpData(req);

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

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send("login successfully");
    } else {
      res.status(401).send(" Invalid credentials ");
    }
  } catch (error) {
    res.status(400).send("some thing went wrong " + error);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).send("logout successfull");
  } catch (err) {
    res.status(400).send("Error" + err);
  }
});

module.exports = authRouter;
