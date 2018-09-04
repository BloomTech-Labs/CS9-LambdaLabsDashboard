import express from "express";
import UserModel from "../Users/userModel.js";
const router = express.Router();
const stripe = require("stripe")("sk_test_4uTrPeq8JDUTDumv8qDek87x");
import authenticate from "../MiddleWare/authJWT.js";

router.get("/", authenticate, (req, res) => {
  res.send("you are on the charge page");
});

router.post("/", (req, res) => {
  console.log("====>", req.body.token);
  console.log("====>", req.body.email);
  const amount = req.body.amount;
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
        description: req.body.name,
        currency: "usd",
        customer: customer.id
      });
    })
    .then(charge => {
      res.send("success");
      res.redirect("http://localhost:3000/projects");
    });
});
module.exports = router;
