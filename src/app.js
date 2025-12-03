"use strict";

const express = require("express");

const app = express();

const mongodb = require("./config/database");

const User = require("./models/user");

// express.json() is a built-in middleware that parses incoming JSON data.
// When a client sends JSON (like in POST /signup), this middleware converts
// the raw JSON into a JavaScript object and attaches it to req.body.
// Without this, req.body would be undefined.
app.use(express.json());

app.post("/signup", async (req, res) => {
  // create a new instace of the user modal
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user signup successfully");
  } catch (err) {
    res.status(400).send("some thing went wrong ");
  }
});

// using mongoose find
app.get("/user", async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email);
    const users = await User.find({ emailId: req.body.email });
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(402).send(" user cannot be found");
    }
  } catch (err) {
    res.status(400).send("some thing went wrong");
  }
});

// using mongoose findOne
app.get("/user-one", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.email });
    console.log(user);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send(" user cannot be found");
    }
  } catch (err) {
    res.status(400).send("some thing went wrong");
  }
});

// send all the user list
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send(" user cannot be found");
    }
  } catch (err) {
    res.status(400).send("some thing went wrong");
  }
});

// using mongoose findById
app.get("/user-id", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send(" cannot find the user");
    }
  } catch (err) {
    res.status(400).send("some thing went wrong");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const id = req.body.id;
    await User.findByIdAndDelete({ _id: id });
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("some thing went wrong");
  }
});

app.patch("/user-update/:userId", async (req, res) => {
  try {
  
    const accpetedBody = [
      
    ]   
 

    const body = req.body;
    const emailId = req.params?.userId;
    await User.findOneAndUpdate({ emailId: emailId }, body);
    res.send("updated successfully");
  } catch (err) {
    res.status(400).send(" some thing went wrong");
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
