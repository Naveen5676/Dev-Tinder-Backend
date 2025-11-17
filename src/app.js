"use strict";

const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ name: "naveen", age: 65 });
});

app.post("/user", (req, res) => {
  res.send("saved in the database");
});

app.use("/test", (req, res) => {
  res.send("wlecome to test page ");
});

app.listen(3000, () => {
  console.log("server is started");
});
