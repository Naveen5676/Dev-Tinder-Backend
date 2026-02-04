const express = require("express");

const userRouter = express.Router();

const userAuth = require("../middlewares/auth");

const ConnectionRequest = require("../models/connectionRequest")

userRouter.get("/user/request/received", userAuth, async(req , res)=>{
    try{

        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            fromUserId: loggedInUser._id,
            status: "interested"    
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "about", "skills", "gender"])

        return res.status(200).json({
            message: "Connection requests received successfully",
            data: connectionRequest
        })

    }catch(err){
        res.status(400).send("error" + err); 
    }
})


userRouter.get("/user/connections", userAuth , async(req, res)=>{
    try{

        const loggedInUser = req.user;
        
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id , status:"accepted"},
                {fromUserId: loggedInUser._id , status:"accepted"}
            ]
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "about", "skills", "gender"])

        const data = connectionRequest.map((request)=> request.fromUserId)

        return res.status(200).json({
            message: "Connection requests received successfully",
            data: data
        })

    }catch(error){
        res.status(400).send("error" + error); 
    }
})


module.exports = userRouter;