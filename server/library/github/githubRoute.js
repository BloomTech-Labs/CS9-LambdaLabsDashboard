const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportSetup = require("./githubPassport.js");
router.get(
  "/",
  passport.authenticate("github", {
    scope: ["profile"]
  }),
  (req, res) => {
    console.log("=====> github here ");
  }
);

module.exports = router;
