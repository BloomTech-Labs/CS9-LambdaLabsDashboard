"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _express=require("express"),_express2=_interopRequireDefault(_express),_userModel=require("../Users/userModel.js"),_userModel2=_interopRequireDefault(_userModel),_authJWT=require("../MiddleWare/authJWT.js"),_authJWT2=_interopRequireDefault(_authJWT);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var Router=_express2.default.Router(),stripe=require("stripe")("sk_test_4uTrPeq8JDUTDumv8qDek87x");Router.get("/",_authJWT2.default,function(a,b){b.send("you are on the charge page")}),Router.post("/:userID",function(a,b){var c=a.params.userID,d=a.body,e=d.name,f=d.email,g=d.amount,h=d.id,i=d.token;i||b.send("there is no token"),stripe.customers.create({email:f,source:i}).then(function(a){stripe.charges.create({amount:g,description:e,currency:"usd",customer:a.id})}).then(function(){var a={subscribed:!0,subscribedDate:new Date};_userModel2.default.findByIdAndUpdate(c,a,{new:!0}).then(function(a){var c=a.name,d=a.email,e=a.subscribed,f=a.subscribedDate;b.json({name:c,email:d,subscribed:e,subscribedDate:f})}).catch(function(){return b.send("error")})}).catch(function(a){return b.send(a)})}),exports.default=Router;