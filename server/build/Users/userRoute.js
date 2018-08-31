"use strict";var _express=require("express"),_express2=_interopRequireDefault(_express),_userModel=require("./userModel.js"),_userModel2=_interopRequireDefault(_userModel),_jwtMiddleWare=require("../MiddleWare/jwtMiddleWare.js"),_middleWare=require("../MiddleWare/middleWare.js"),_authJWT=require("../MiddleWare/authJWT.js"),_authJWT2=_interopRequireDefault(_authJWT);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var Router=_express2.default.Router();Router.get("/",function(a,b){_userModel2.default.find({}).then(function(a){b.status(200).json({users:a})}).catch(function(a){b.status(500).json({msg:a})})}),Router.post("/",function(a,b){var c=a.body,d=c.name,e=c.email,f=(0,_userModel2.default)(c);_userModel2.default.find({email:e}).then(function(a){0===a.length?f.save().then(function(a){var c=(0,_jwtMiddleWare.makeToken)(a),d=a._id;b.status(200).json({msg:"user posted successfully ",_id:d,token:c})}).catch(function(){b.send(d+" already exists. Please login")}):b.send(e+" already exists. Please login")})}),Router.put("/:id",function(a,b){var c=a.params.id,d=a.body;_userModel2.default.findByIdAndUpdate(c,d,{new:!0}).then(function(a){b.status(200).json({msg:"user updated successfully",p:a})}).catch(function(){b.status(500).json({msg:"... not able to update your user"})})}),Router.delete("/:id",function(a,b){var c=a.params.id;_userModel2.default.findById(c).remove().then(function(){b.status(200).json({msg:"...user  successfully deleted"})}).catch(function(){b.status(200).json({msg:"... not able to  delete user"})})}),module.exports=Router;