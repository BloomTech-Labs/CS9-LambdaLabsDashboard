"use strict";var express=require("express"),router=express.Router(),passport=require("passport");router.get("/",passport.authenticate("google",{scope:["profile"]})),module.exports=router;