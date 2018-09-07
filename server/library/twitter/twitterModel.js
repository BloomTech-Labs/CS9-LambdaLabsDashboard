const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const definition = {
  username: String,
  twitterId: String
};

const twitterUserSchema = new Schema(definition);
const twitterUserModel = mongoose.model("twitterUsers", twitterUserSchema);
module.exports = twitterUserModel;
