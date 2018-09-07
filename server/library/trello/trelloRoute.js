const express = require("express");
const router = express.Router();
const passport = require("passport");
// const passportSetup = require("./trelloPassport.js");
router.get(
  "/",
  passport.authenticate("trello", {
    scope: ["profile"]
  })
);

module.exports = router;
