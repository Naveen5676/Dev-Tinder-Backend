"use strict";

const express = require("express");

const app = express();


// first preference is to use try catch to handle the error 
app.get('/user', (req, res)=>{
  try{
     // logic to get user list from db
      res.send('user list sent ')    
  }catch(error){
        res.status(500).send('some thing went wrong ')
  }
})


// so this is wild card error is try catch is not defiend then we use this at the end of the code in order to catch the error 
// the error should be at the first in order use err in the parameters 
app.use('/', (err , req , res, next)=>{
  if(err){
    res.status(500).send("something went wrong ")
  }
})

app.listen(3000, () => {
  console.log("server is started");
});
