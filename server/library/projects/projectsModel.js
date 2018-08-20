const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
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
const options = {
  timestamps: true
};

const lambdaProjectsSchema = new Schema(definition, options);

const lambdaProjectsModel = mongoose.model(
  "LambdaProject",
  lambdaProjectsSchema
);

module.exports = lambdaProjectsModel;
