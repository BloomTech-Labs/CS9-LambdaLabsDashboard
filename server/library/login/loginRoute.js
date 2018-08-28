import express from "express";
import UserModel from "../Users/userModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("you are logged-in ");
});
/////:
router.post("/", (req, res) => {
  const { username, password } = req.body;

  console.log("username", username);

  UserModel.findOne({ username })
    .then(p => {
      p.checkPassWord(password)
        .then(result => {
          if (result) {
            const token = makeToken(p);
            const { _id } = p;
            res.status(200).json({ msg: "login successful", _id, token });
          } else {
            res.send("Incorrect password");
          }
        })
        .catch(err => {
          res.send("Something went wrong. Please try again");
        });
    })

    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

module.exports = router;
