const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  className: {
    type: String,
    unique: true
  },
  startDate: {
    type: String,
    default: new Date()
  },
  endDate: {
    type: String
  }
};
const options = {
  timestamps: true
};

const classSchema = new Schema(definition, options);

const classModel = mongoose.model("Class", classSchema);

module.exports = classModel;
