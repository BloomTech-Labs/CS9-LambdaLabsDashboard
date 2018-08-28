import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  projectName: {
    type: String,
    required: true
  },
  githubHandle: {
    type: String,
    unique: true,
    required: true
  },

  class: {
    type: String,
    required: true
  },

  trelloName: {
    type: String,
    unique: true,
    required: true
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
