const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

module.exports = router;
