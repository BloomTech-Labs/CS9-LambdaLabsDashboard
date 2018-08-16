const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

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
