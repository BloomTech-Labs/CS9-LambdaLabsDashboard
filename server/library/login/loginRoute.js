const express = require("express");
const router = express.Router();
import UserModel from "../Users/userModel.js";

router.get("/", (req, res) => {
  res.send("you are logged-in ");
});

router.post("/", (req, res) => {
  const user = UserModel.find({ username: req.body.username });

  user.then(user => {
    if (user) {
      res.json({ msg: "user exist", user });
    } else {
      res.send("there is no such user");
    }
  });
});

module.exports = router;
