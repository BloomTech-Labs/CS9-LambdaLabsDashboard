import express from "express";
const router = express.Router();
import passport from "passport";
import passportSetup from "./facebookPassport.js";
router.get(
  "/",
  passport.authenticate("facebook", {
    scope: "read_stream"
  })
);

module.exports = router;
