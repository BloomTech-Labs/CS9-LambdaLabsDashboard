"use strict";

var _studentModel = require("./studentModel.js");

var _studentModel2 = _interopRequireDefault(_studentModel);

var _jwtMiddleWare = require("../Middleware/jwtMiddleWare.js");

var _middleWare = require("../MiddleWare/middleWare.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();


router.get("/", function (req, res) {
  console.log(req.body);
  _studentModel2.default.find({}).populate("className", "-_id").populate("project", "-_id").then(function (s) {
    res.status(200).json({ students: s });
  }).catch(function (error) {
    res.status(500).json({ msg: error });
  });
});

router.post("/", function (req, res) {
  console.log("request ===>", req.body);
  var obj = req.body;
  var newStudent = (0, _studentModel2.default)(obj);
  newStudent.save().then(function (p) {
    console.log(p);
    res.status(200).json({ newStudent: newStudent });
  }).catch(function (error) {
    res.status(200).json({ msg: "... not able to post your student", error: error });
  });
});

router.put("/:id", function (req, res) {
  var id = req.params.id;

  var obj = req.body;
  console.log(obj);
  console.log(id);
  _studentModel2.default.findByIdAndUpdate(id, obj, { new: true }).then(function (p) {
    res.status(200).json({ msg: "user updated successfully", p: p });
  }).catch(function (err) {
    res.status(500).json({ msg: "... not able to update your user" });
  });
});

router.get("/:id", function (req, res) {
  var id = req.params.id;

  _studentModel2.default.findById(id).populate("className", "-_id").populate("project", "-_id").then(function (p) {
    res.status(200).json(p);
  }).catch(function (err) {
    res.status(500).json({ msg: "we cant display expenses " });
  });
});

router.delete("/:id", function (req, res) {
  var id = req.params.id;

  _studentModel2.default.findById(id).remove().then(function (p) {
    res.status(200).json({ msg: "...student  successfully deleted" });
  }).catch(function (err) {
    res.status(200).json({ msg: "... not able to  delete student" });
  });
});

module.exports = router;