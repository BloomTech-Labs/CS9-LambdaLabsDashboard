import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  projectName: {
    type: String
    // unique: true
  },
  githubHandle: {
    type: String
  },

  class: {
    type: String
  },

  trelloName: {
    type: String
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
