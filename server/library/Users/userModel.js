const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const definition = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  subscribed: {
    type: Boolean,
    default: false
  },
  subscribedDate: {
    type: Date,
    default: null
  }
};

const options = {
  timestamps: true
};

const userSchema = new Schema(definition, options);

userSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 11)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => {
      next(err);
    });
});

userSchema.methods.checkPassWord = function(guessedPassWord) {
  return bcrypt.compare(guessedPassWord, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
