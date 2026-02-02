const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type" + status,
        });
      }

      if (fromUserId.toString() === toUserId) {
        return res.status(400).json({ message: "cannot request yourself" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request Already Exists !!" });
      }

      console.log(status);
      console.log(toUserId);
      console.log(fromUserId);

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "saved successfully",
        data: data,
      });
    } catch (err) {
      res.status(400).send("Error " + err);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type " + status,
        });
      }

      console.log({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      const validConnectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!validConnectionRequest) {
        return res.status(400).json({
          message: "Invalid connection request",
        });
      }

      validConnectionRequest.status = status;

      const data = await validConnectionRequest.save();

      res.status(200).json({
        message: "connection request " + status + " successfully",
        data,
      });
    } catch (error) {
      res.status(400).send("Error " + error);
    }
  }
);

module.exports = requestRouter;
