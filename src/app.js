"use strict";

const express = require("express");

const app = express();

const mongodb = require("./config/database");

const User = require("./models/user");

const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const { userAuth } = require("./middlewares/auth");

// express.json() is a built-in middleware that parses incoming JSON data.
// When a client sends JSON (like in POST /signup), this middleware converts
// the raw JSON into a JavaScript object and attaches it to req.body.
// Without this, req.body would be undefined.
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

    await user.save({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    res.send("user signup successfully");
  } catch (err) {
    res.status(400).send("some thing went wrong " + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(401).send(" Invalid credentails");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DevTineder@1234", {
        expiresIn: "7d",
      });
      res.cookie("token", token);
      res.status(200).send("login successfully");
    } else {
      res.status(401).send(" Invalid credentials ");
    }
  } catch (err) {
    res.send(400).send("some thing went wrong " + error);
  }
});

// using mongoose findById
app.get("/user", userAuth, async (req, res) => {
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

mongodb()
  .then(() => {
    console.log("database connected successfully ");
    app.listen(3000, () => {
      console.log("server is connected on 3000 port ");
    });
  })
  .catch((err) => {
    console.err("something went worng could not connect to db ");
  });
