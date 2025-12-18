"use strict";

const express = require("express");

const app = express();

const mongodb = require("./config/database");

const User = require("./models/user");

const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");



// express.json() is a built-in middleware that parses incoming JSON data.
// When a client sends JSON (like in POST /signup), this middleware converts
// the raw JSON into a JavaScript object and attaches it to req.body.
// Without this, req.body would be undefined.
app.use(express.json());
app.use(cookieParser());

// Express route module imports
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
