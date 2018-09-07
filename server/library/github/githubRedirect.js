const express = require("express");
const router = express.Router();
const passport = require("passport");
const { makeToken } = require("../MiddleWare/jwtMiddleWare.js");
const passportSetup = require("./githubPassport.js");

router.get("/", passport.authenticate("github"), (req, res) => {
  // const token = makeToken(req.user);
  // console.log('token', token);
  // // res.status(200).json({ msg: token });
  console.log("google redirect");

  // res.redirect("http://localhost:3000/app");
});

module.exports = router;
