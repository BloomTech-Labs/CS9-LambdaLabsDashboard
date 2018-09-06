const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const definition = {
  userEmail: String,
  facebookId: String
};

const facebookSchema = new Schema(definition);
const facebookModel = mongoose.model("FacebookUsers", facebookSchema);
module.exports = facebookModel;
