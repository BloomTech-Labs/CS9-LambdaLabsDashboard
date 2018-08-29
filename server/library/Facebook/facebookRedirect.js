import express from "express";
const router = express.Router();
import passport from "passport";
import passportSetup from "./facebookPassport.js";

router.get("/", passport.authenticate("facebook"), (req, res) => {
  console.log("facebook redirecting.....!!!");
  res.redirect("https://localhost:3000/projects");
});

// router.get('/', (req, res) => {

//   res.send('facebook redirect')
// })

module.exports = router;
