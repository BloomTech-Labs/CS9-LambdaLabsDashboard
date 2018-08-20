import express from 'express';
import UserModel from "../Users/userModel.js";
const router = express.Router();
const stripe = require("stripe")("sk_test_F2N15doyqIvd8Qb47d1Setor");
import authenticate from "../MiddleWare/authJWT.js";

router.get("/", authenticate, (req, res) => {
  res.send("you are on the charge page");
});

router.post("/", authenticate, (req, res) => {
  console.log("====>", req.body.token);
  console.log("====>", req.body.email);
  const amount = 2000;
  const token = req.body.token;
  if (!token) {
    res.send("there is no token");
  }

  stripe.customers
    .create({
      email: req.body.email,
      source: req.body.token
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
      res.send("success");
    });
});
module.exports = router;
