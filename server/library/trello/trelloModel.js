const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const definition = {
  username: String,
  googleId: String
  // subscribed: {
  //   type: Boolean,
  //   default: false
  // },
  // subscribedDate: {
  //   type: Date,
  //   default: null
  // }
};

const trelloUserSchema = new Schema(definition);
const trelloUserModel = mongoose.model("TrelloUsers", trelloUserSchema);
module.exports = trelloUserModel;
