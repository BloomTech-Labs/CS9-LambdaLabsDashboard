const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const definition = {
  userEmail: String,
  githubId: String
};

const githubSchema = new Schema(definition);
const githubModel = mongoose.model("GithubUsers", githubSchema);
module.exports = githubModel;
