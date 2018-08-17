"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var definition = {
  projectName: {
    type: String,
    unique: true
  },
  numberOfStudents: {
    type: Number
  },
  dueDate: {
    type: String
  }
};
var options = {
  timestamps: true
};

var lambdaProjectsSchema = new Schema(definition, options);

var lambdaProjectsModel = mongoose.model("LambdaProject", lambdaProjectsSchema);

module.exports = lambdaProjectsModel;