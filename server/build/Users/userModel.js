"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var definition = {
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
};
var options = {
  timestamps: true
};

var userSchema = new Schema(definition, options);

var userModel = mongoose.model("User", userSchema);

module.exports = userModel;