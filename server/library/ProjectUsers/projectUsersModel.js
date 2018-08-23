import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  projectId: {
    type: String,
    unique: true
  },
  users: {
    type: [String]
  }
};
const options = {
  timestamps: true
};

const ProjectUsersSchema = new Schema(definition, options);

const projectUsersModel = mongoose.model("ProjectUser", ProjectUsersSchema);

module.exports = projectUsersModel;
