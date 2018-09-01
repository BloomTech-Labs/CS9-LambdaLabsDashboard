import express from "express";
import UserModel from "../Users/userModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";

const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("you are logged-in ");
});

Router.post("/", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then(p => {
      p.checkPassWord(password).then(result => {
        if(result) {
          const token = makeToken(p);
          const { _id } = p;
          res.status(200).json({ msg: "login successful", _id, token });
        } else {
          res.send("Incorrect password");
        }
      })
      .catch(err => res.send("Something went wrong. Please try again"));
    })
    .catch(err => {
      res.send("User not found");
    });
});

export default Router;
