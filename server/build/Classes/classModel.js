"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var definition = {
  className: {
    type: String,
    unique: true
  },
  numberOfStudents: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  Students: {
    type: ObjectId,
    ref: "Student"
  },
  Project: {
    type: ObjectId,
    ref: "Project"
  }
};
var options = {
  timestamps: true
};

var classSchema = new Schema(definition, options);

var classModel = mongoose.model("Class", classSchema);

module.exports = classModel;