const express = require("express");
const router = express.Router();
const passport = require("passport");
const { makeToken } = require("../MiddleWare/jwtMiddleWare.js");

router.get("/", passport.authenticate("google"), (req, res) => {
  // const token = makeToken(req.user);
  // console.log("token", token);
  // const options = {
  //   headers: {
  //     authorization: `token ${token}`
  //   }
  // };
  console.log("hello");
  res.redirect("localhost:3000/projects");
});

module.exports = router;
