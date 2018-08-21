const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportSetup = require("../passport/passport-setup.js");
const { makeToken } = require("../MiddleWare/jwtMiddleWare.js");

router.get("/", passport.authenticate("google"), (req, res) => {
  const token = makeToken(req.user);
  console.log("token", token);
  const options = {
    headers: {
      authorization: `token ${token}`
    }
  };
  // res.send("hello");
  res.redirect("localhost:3000/projects");
});

module.exports = router;
