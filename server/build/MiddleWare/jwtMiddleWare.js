"use strict";

var jwt = require("jsonwebtoken");
var keys = require("../keys");
var secret = keys.secretKey.secretKey;

function makeToken(user) {
  var payload = {
    sub: user._id,
    iat: new Date().getTime(),
    username: user.username
  };
  var options = {
    expiresIn: "24h"
  };
  var token = jwt.sign(payload, secret, options);
  return token;
}
module.exports = { makeToken: makeToken, secret: secret };