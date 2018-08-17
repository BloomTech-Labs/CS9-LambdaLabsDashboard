const express = require("express");
const router = express.Router();
import UserModel from "../Users/userModel.js";
const stripe = require("stripe")("sk_test_F2N15doyqIvd8Qb47d1Setor");

router.get("/", (req, res) => {
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

router.post("/charge", (req, res) => {
  console.log("====>", req.body);
  const amount = 2000;
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => {
      stripe.charges.create({
        amount: amount,
        description: "trip",
        currency: "usd",
        customer: customer.id
      });
    })
    .then(charge => {
      // res.redirect("http://localhost:3000/Billing");
      res.json(charge);
    });
});
module.exports = router;
