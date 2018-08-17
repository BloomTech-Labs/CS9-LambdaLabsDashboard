"use strict";

var _userModel = require("../Users/userModel.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();

var stripe = require("stripe")("sk_test_F2N15doyqIvd8Qb47d1Setor");

router.get("/", function (req, res) {
  res.send("you are on the charge page");
});

// router.post("/", (req, res) => {
//   const user = UserModel.find({ username: req.body.username });

//   user.then(user => {
//     if (user) {
//       res.json({ msg: "user exist", user });
//     } else {
//       res.send("there is no such user");
//     }
//   });
// });

router.post("/charge", function (req, res) {
  console.log("====>", req.body);
  var amount = 2000;
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  }).then(function (customer) {
    stripe.charges.create({
      amount: amount,
      description: "trip",
      currency: "usd",
      customer: customer.id
    });
  }).then(function (charge) {
    // res.redirect("http://localhost:3000/Billing");
    res.json(charge);
  });
});
module.exports = router;