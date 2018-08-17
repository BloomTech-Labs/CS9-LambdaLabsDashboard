"use strict";

var ProjectModel = require("../projects/projectsModel.js");
var UserModel = require("../Users/userModel.js");

var noneEmpty = function noneEmpty(req, res, next) {
  var projectName = req.body.projectName;
  var numberOfStudents = req.body.numberOfStudents;
  var dueDate = req.body.dueDate;
  if (projectName === "" || numberOfStudents === "" || dueDate === "") {
    return res.status(400).json(" fields are require, plz enter the missing field ....");
  } else {
    next();
  }
};

var userEmpty = function userEmpty(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if (username === "" || password === "") {
    return res.status(400).json("credentials can`t be empty..!!!");
  } else {
    next();
  }
};
module.exports = { noneEmpty: noneEmpty, userEmpty: userEmpty };