import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  fullName: {
    type: String,
    unique: true,
    required: true
  },
  trello: {
    type: String
  },
  email: {
    type: String
  },
  github: {
    type: String
  },
  location: {
    type: String
  }
};
const options = {
  timestamps: true
};

const studentSchema = new Schema(definition, options);

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
