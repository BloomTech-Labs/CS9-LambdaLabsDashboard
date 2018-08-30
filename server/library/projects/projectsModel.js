import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const definition = {
  name: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
  trello: {
    type: String,
    required: true
  },
  classID: {
    type: ObjectId,
    ref: 'Class',
    required: true
  }
};

const options = {
  timestamps: true
};

const lambdaProjectsSchema = new Schema(definition, options);

const lambdaProjectsModel = mongoose.model("LambdaProject", lambdaProjectsSchema, "LambdaProject");

module.exports = lambdaProjectsModel;
