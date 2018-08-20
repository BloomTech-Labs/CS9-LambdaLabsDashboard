"use strict";

var _classModel = require("./classModel.js");

var _classModel2 = _interopRequireDefault(_classModel);

var _jwtMiddleWare = require("../Middleware/jwtMiddleWare.js");

var _middleWare = require("../MiddleWare/middleWare.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();


router.get("/", function (req, res) {
  console.log(req.body);
  _classModel2.default.find({}).populate("Students", "-_id").populate("LambdaProject", "-_id").then(function (p) {
    res.status(200).json({ classes: p });
  }).catch(function (error) {
    res.status(500).json({ msg: error });
  });
});

router.post("/", _middleWare.userEmpty, function (req, res) {
  console.log("request ===>", req.body);
  var obj = req.body;
  var newClass = (0, _classModel2.default)(obj);
  newClass.save().then(function (p) {
    console.log(p);
    res.status(200).json({ newClass: newClass });
  }).catch(function (error) {
    res.status(200).json({ msg: "... not able to post your user", error: error });
  });
});

router.get("/:id", function (req, res) {
  var id = req.params.id;

  _classModel2.default.findById(id).populate("Students", "-_id").populate("LambdaProject", "-_id").then(function (p) {
    res.status(200).json(p);
  }).catch(function (err) {
    res.status(500).json({ msg: "we cant display this class " });
  });
});

router.put("/:id", function (req, res) {
  var id = req.params.id;

  var obj = req.body;
  console.log(obj);
  console.log(id);
  _classModel2.default.findByIdAndUpdate(id, obj, { new: true }).then(function (p) {
    res.status(200).json({ msg: "class updated successfully", p: p });
  }).catch(function (err) {
    res.status(500).json({ msg: "... not able to update your class" });
  });
});

router.delete("/:id", function (req, res) {
  var id = req.params.id;

  _classModel2.default.findById(id).remove().then(function (p) {
    res.status(200).json({ msg: "...class  successfully deleted" });
  }).catch(function (err) {
    res.status(200).json({ msg: "... not able to  delete class" });
  });
});

module.exports = router;