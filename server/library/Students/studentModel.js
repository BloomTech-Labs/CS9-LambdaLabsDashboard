import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  slack: {
    type: String
  },
  trelloName: {
    type: String
  },
  email: {
    type: String
  },
  github: {
    type: String
  }
};
const options = {
  timestamps: true
};

const studentSchema = new Schema(definition, options);

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
