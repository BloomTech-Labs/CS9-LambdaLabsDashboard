import jwt from "jsonwebtoken";
require('dotenv').config();

const secret = process.env.SECRET_KEY;

function makeToken(user) {
  const { _id, email } = user;
  const payload = {
    sub: _id,
    iat: new Date().getTime(),
    email
  };
  const options = {
    expiresIn: "24h"
  };
  const token = jwt.sign(payload, secret, options);
  return token;
}

export { makeToken, secret };
