"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

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
  },
  class: {
    type: ObjectId,
    ref: "Class"
  },
  students: {
    type: ObjectId,
    ref: "Student"
  }
};
var options = {
  timestamps: true
};

var lambdaProjectsSchema = new Schema(definition, options);

var lambdaProjectsModel = mongoose.model("LambdaProject", lambdaProjectsSchema);

module.exports = lambdaProjectsModel;