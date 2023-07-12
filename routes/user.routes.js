const express = require("express");
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.json({ error: err.message });
      } else {
        const user = new userModel({ name, email, password: hash });
        await user.save();
        res.json({ msg: "User has been registered", user: req.body });
      }
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});


userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userID: user._id, user: user.name },
            process.env.secret
          );
          res.status(200).json({ msg: "Logged In!!", token });
        } else {
          res.status(400).json({ error: "Wrong Credentials!!" });
        }
      });
    } else {
      res.status(400).json({ msg: "User does not exist!!" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

userRouter.get("/", async (req, res) => {
  // const query = req.query;
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});



userRouter.patch("/update/:userID", async (req, res) => {
  const { userID } = req.params;
  const payload = req.body;
  try {
    await userModel.findByIdAndUpdate({ _id: userID }, payload);
    const updatedUser = await userModel.find({ _id: userID });
    res
      .status(200)
      .json({ msg: "user has been updated", user: updatedUser[0] });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});


userRouter.delete("/delete/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const deletedUser = await userModel.find({ _id: userID });
    await userModel.findByIdAndDelete({ _id: userID });
    res
      .status(200)
      .json({ msg: "useer has been deleted", user: deletedUser[0] });
  } catch (err) {
    res.status(200).json({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
