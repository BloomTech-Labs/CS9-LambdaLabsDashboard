"use strict";var express=require("express"),router=express.Router(),passport=require("passport"),passportSetup=require("../passport/passport-setup.js"),_require=require("../MiddleWare/jwtMiddleWare.js"),makeToken=_require.makeToken;router.get("/",passport.authenticate("google"),function(a,b){var c=makeToken(a.user);b.redirect("localhost:3000/projects")}),module.exports=router;