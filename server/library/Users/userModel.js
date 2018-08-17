const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const definition = {
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
};
const options = {
  timestamps: true
};

const userSchema = new Schema(definition, options);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
