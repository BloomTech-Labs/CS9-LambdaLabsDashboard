const express = require("express");
const router = express.Router();
import UserModel from "./userModel.js";
import { makeToken, secret } from "../Middleware/jwtMiddleWare.js";
import { userEmpty } from "../MiddleWare/middleWare.js";

router.get("/", (req, res) => {
  console.log(req.body);
  UserModel.find({})
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch(error => {
      res.status(500).json({ msg: error });
    });
});

router.post("/", userEmpty, (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.status(400).json({ msg: " fields can not be empty...!" });
  }
  console.log("request ===>", req.body);
  const obj = req.body;
  const newUser = UserModel(obj);
  newUser
    .save()
    .then(p => {
      console.log(p);
      res.status(200).json({ newUser });
    })
    .catch(error => {
      res.status(200).json({ msg: "... not able to post your user", error });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  console.log(obj);
  console.log(id);
  UserModel.findByIdAndUpdate(id, obj, { new: true })
    .then(p => {
      res.status(200).json({ msg: "user updated successfully", p });
    })
    .catch(err => {
      res.status(500).json({ msg: "... not able to update your user" });
    });
});
module.exports = router;
