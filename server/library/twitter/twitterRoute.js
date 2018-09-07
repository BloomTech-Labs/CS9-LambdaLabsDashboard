const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportSetup = require("./twitterPassport.js");
router.get(
  "/",
  passport.authenticate("twitter", {
    scope: ["profile"]
  }),
  (req, res) => {
    console.log("twitter");
  }
);

module.exports = router;
