"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var definition = {
  firstName: {
    type: String,
    unique: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  github: {
    type: String
  },
  class: {
    type: String
  },
  className: {
    type: ObjectId,
    ref: "Class"
  },
  project: {
    type: ObjectId,
    ref: "LambdaProject"
  }
};
var options = {
  timestamps: true
};

var studentSchema = new Schema(definition, options);

var studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;