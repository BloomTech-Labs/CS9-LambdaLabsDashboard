import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
  fullName: {
    type: String
  },
  trello: {
    type: String
  },
  github: {
    type: String
  },
  email: {
    type: String
  },
  location: {
    type: String
  }
};
const options = {
  timestamps: true
};

const credentialsSchema = new Schema(definition, options);

const credentialsModel = mongoose.model("Credential", credentialsSchema);

module.exports = credentialsModel;
// const object = {
//   fullName: fullName,
//   trello: trello,
//   github: github,
//   email: email,
//   location: location
// };
