import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  className: {
    type: String,
    unique: true
  },
  numberOfStudents: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  Students: {
    type: ObjectId,
    ref: "Student"
  },
  Project: {
    type: ObjectId,
    ref: "Project"
  }
};
const options = {
  timestamps: true
};

const classSchema = new Schema(definition, options);

const classModel = mongoose.model("Class", classSchema);

module.exports = classModel;
