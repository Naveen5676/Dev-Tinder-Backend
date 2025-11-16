const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("wlecome to test page ");
});

app.use("/", (req, res) => {
  res.send("welcome to the home page ");
});

app.listen(7777, () => {
  console.log("server is started");
});
