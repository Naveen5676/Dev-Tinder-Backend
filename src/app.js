"use strict";

const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/userList", (req, res) => {
  res.send("all user data sent");
});

app.get("/user/list", userAuth, (req, res) => {
  res.send("user list sent");
});

app.get("/login", (req, res) => {
  res.send("login in user");
});

app.listen(3000, () => {
  console.log("server is started");
});
