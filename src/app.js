"use strict";

const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log(" first request handler 1");
    next();
  },
  (req, res) => {
    console.log("seecond request handler 2");
    res.send("second request handler");
  }
);

app.use('/product', rh1, [rh2, rh3] , rh4 , rh5)

app.listen(3000, () => {
  console.log("server is started");
});
