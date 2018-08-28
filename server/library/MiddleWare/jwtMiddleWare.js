import jwt from "jsonwebtoken";
import keys from "../keys";

const secret = keys.secretKey.secretKey;

function makeToken(user) {
  const payload = {
    sub: user._id,
    iat: new Date().getTime(),
    username: user.username
  };
  const options = {
    expiresIn: "24h"
  };
  const token = jwt.sign(payload, secret, options);
  return token;
}

export { makeToken, secret };
