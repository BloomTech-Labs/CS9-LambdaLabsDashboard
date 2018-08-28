import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  className: {
    type: String,
    unique: true
  },
  userID: {
    type: ObjectId,
    required: true
  }
};
const options = {
  timestamps: true
};

const classSchema = new Schema(definition, options);

const classModel = mongoose.model("Class", classSchema);

module.exports = classModel;
