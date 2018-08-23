import express from "express";
import UserModel from "./userModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";
import { userEmpty } from "../MiddleWare/middleWare.js";
const router = express.Router();
import authenticate from "../MiddleWare/authJWT.js";

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
  console.log("request ===>", req.body);
  const obj = req.body;
  const newUser = UserModel(obj);
  newUser
    .save()
    .then(p => {
      console.log(p);
      const token = makeToken(newUser);

      res
        .status(200)
        .json({ msg: "user posted successfully ", newUser, token });
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
