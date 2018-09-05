import express from "express";
import UserModel from "./userModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";
import { userEmpty } from "../MiddleWare/middleWare.js";
import { updatePassword } from '../Helpers/User';
import authenticate from "../MiddleWare/authJWT.js";

const Router = express.Router();

const validateField = field => {
  return field === null || field === undefined;
}

Router.get("/:id", (req, res) => {
  const { id } = req.params;
  UserModel.findById(id)
    .then(user => {
      const { name, email, subscribed, subscribedDate } = user;
      res.status(200).json({ 
        userName: name, 
        userEmail: email,
        subscribed: validateField(subscribed) ? false : subscribed, 
        subscribedDate: validateField(subscribedDate) ? null : subscribedDate
      });
    })
    .catch(error => {
      res.status(500).json({ msg: error });
    });
});

Router.post("/", (req, res) => {
  console.log("request ===>", req.body);
  const obj = req.body;
  const { name, email } = obj;
  const newUser = UserModel(obj);
  UserModel.find({ email })
    .then(arr => {
      if(arr.length === 0) {
        newUser.save()
          .then(savedUser => {
            const token = makeToken(savedUser);
            const { _id } = savedUser;
            res.status(200).json({ msg: "user posted successfully ", _id, token });
          })
          .catch(err => {
            console.log(err);
            res.send(`${name} already exists. Please login`);
          });
      } else {
        res.send(`${email} already exists. Please login`);
      }
    })
});

Router.put("/:id", (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  if('password' in obj) {
    updatePassword(obj, res, id);
  } else {
    UserModel.findByIdAndUpdate(id, obj, { new: true })
      .then(p => {
        const { name, email, subscribed, subscribedDate } = p;
        res.status(200).json({ 
          userName: name, 
          userEmail: email,
          subscribed: validateField(subscribed) ? false : subscribed, 
          subscribedDate: validateField(subscribedDate) ? null : subscribedDate
        });
      })
      .catch(err => {
        res.status(500).json({ msg: "... not able to update your user" });
      });
  }
});

Router.delete("/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .remove()
    .then(p => {
      res.status(200).json({ msg: "...user  successfully deleted" });
    })
    .catch(err => {
      res.status(200).json({ msg: "... not able to  delete user" });
    });
});

module.exports = Router;
