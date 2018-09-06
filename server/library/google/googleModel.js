const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const definition = {
  username: String,
  googleId: String,
  subscribed: {
    type: Boolean,
    default: false
  },
  subscribedDate: {
    type: Date,
    default: null
  }
};

const googleUserSchema = new Schema(definition);
const googleUserModel = mongoose.model("GoogleUsers", googleUserSchema);
module.exports = googleUserModel;
