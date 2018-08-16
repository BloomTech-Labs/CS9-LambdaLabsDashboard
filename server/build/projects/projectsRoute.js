"use strict";

var _projectsModel = require("./projectsModel.js");

var _projectsModel2 = _interopRequireDefault(_projectsModel);

var _middleWare = require("../MiddleWare/middleWare.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();


router.get("/", function (req, res) {
  console.log(req.body);
  _projectsModel2.default.find({}).then(function (projects) {
    res.status(200).json({ projects: projects });
  }).catch(function (error) {
    res.status(500).json({ msg: error });
  });
});

router.post("/", _middleWare.noneEmpty, function (req, res) {
  console.log("request ===>", req.body);
  var obj = req.body;
  var newProject = (0, _projectsModel2.default)(obj);
  newProject.save().then(function (p) {
    console.log(p);
    res.status(200).json({ newProject: newProject });
  }).catch(function (error) {
    res.status(200).json({ msg: "... not able to post your project", error: error });
  });
});

router.put("/:id", function (req, res) {
  var id = req.params.id;

  var obj = req.body;
  console.log(obj);
  console.log(id);
  _projectsModel2.default.findByIdAndUpdate(id, obj, { new: true }).then(function (p) {
    res.status(200).json({ msg: "project updated successfully", p: p });
  }).catch(function (err) {
    res.status(500).json({ msg: "... not able to update your project" });
  });
});
module.exports = router;