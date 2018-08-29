import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  className: {
    type: String,
    required: true,
  },
  userID: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  projects: [{ type: ObjectId, ref: 'LambdaProject' }]
};
const options = {
  timestamps: true
};

const classSchema = new Schema(definition, options);

const classModel = mongoose.model("Class", classSchema, "Class");

module.exports = classModel;
