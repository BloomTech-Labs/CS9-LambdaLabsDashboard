import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  projectName: {
    type: String,
    unique: true
  },
  githubRepoName: {
    type: String
  },

  classId: {
    type: ObjectId,
    ref: "Class"
  },

  trelloId: {
    type: String
  }
  // students: [
  //   {
  //     type: ObjectId,
  //     ref: "Student"
  //   }
  // ]
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
