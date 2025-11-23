"use strict";

const express = require("express");

const app = express();

const mongodb = require("./config/database");

const User = require("./models/user")

app.post('/signup', async(req, res)=>{
  // create a new instace of the user modal 
  const user = new User({
    firstName: "naveen",
    lastName: "wali",
    emailId: "naveen@gmail.com",
    password: "naveen@123"
  })

  try{
         
    await user.save()
    res.send("user signup successfully")
  }catch(err){
    res.status(400).send("some thing went wrong ")
  }
})

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
