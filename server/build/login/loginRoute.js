"use strict";

var _userModel = require("../Users/userModel.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();


router.get("/", function (req, res) {
  res.send("you are logged-in ");
});

router.post("/", function (req, res) {
  var user = _userModel2.default.find({ username: req.body.username });

  user.then(function (user) {
    if (user) {
      res.json({ msg: "user exist", user: user });
    } else {
      res.send("there is no such user");
    }
  });
});

module.exports = router;