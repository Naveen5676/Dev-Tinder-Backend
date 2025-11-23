"use strict";

const express = require("express");

const app = express();

const mongodb = require("./config/database");

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
