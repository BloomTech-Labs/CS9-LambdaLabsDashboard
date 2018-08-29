import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  name: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  trello: {
    type: String,
    required: true
  },
  classID: {
    type: ObjectId,
    required: true
  }
};

const options = {
  timestamps: true
};

const lambdaProjectsSchema = new Schema(definition, options);

const lambdaProjectsModel = mongoose.model("LambdaProject", lambdaProjectsSchema);

module.exports = lambdaProjectsModel;
