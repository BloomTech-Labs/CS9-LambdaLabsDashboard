import express from "express";
const router = express.Router();
import passport from "passport";
import passportSetup from "./facebookPassport.js";
router.get(
  "/",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

module.exports = router;
