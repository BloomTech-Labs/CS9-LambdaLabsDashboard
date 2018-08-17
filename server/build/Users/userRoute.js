"use strict";

var _userModel = require("./userModel.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _jwtMiddleWare = require("../Middleware/jwtMiddleWare.js");

var _middleWare = require("../MiddleWare/middleWare.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();


router.get("/", function (req, res) {
  console.log(req.body);
  _userModel2.default.find({}).then(function (users) {
    res.status(200).json({ users: users });
  }).catch(function (error) {
    res.status(500).json({ msg: error });
  });
});

router.post("/", _middleWare.userEmpty, function (req, res) {
  console.log("request ===>", req.body);
  var obj = req.body;
  var newUser = (0, _userModel2.default)(obj);
  newUser.save().then(function (p) {
    console.log(p);
    var token = (0, _jwtMiddleWare.makeToken)(newUser);

    res.status(200).json({ token: token, newUser: newUser });
  }).catch(function (error) {
    res.status(200).json({ msg: "... not able to post your user", error: error });
  });
});

router.put("/:id", function (req, res) {
  var id = req.params.id;

  var obj = req.body;
  console.log(obj);
  console.log(id);
  _userModel2.default.findByIdAndUpdate(id, obj, { new: true }).then(function (p) {
    res.status(200).json({ msg: "user updated successfully", p: p });
  }).catch(function (err) {
    res.status(500).json({ msg: "... not able to update your user" });
  });
});
module.exports = router;