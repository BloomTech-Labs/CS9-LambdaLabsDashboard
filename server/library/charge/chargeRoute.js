import express from "express";
import UserModel from "../Users/userModel.js";
import authenticate from "../MiddleWare/authJWT.js";

const Router = express.Router();
const stripe = require("stripe")("sk_test_4uTrPeq8JDUTDumv8qDek87x");

Router.get("/", authenticate, (req, res) => {
  res.send("you are on the charge page");
});

Router.post("/:userID", (req, res) => {
  const { userID } = req.params;
  const { name, email, amount, id, token } = req.body;
  console.log("====>", email);
  console.log("====>", token);
  if (!token) {
    res.send("there is no token");
  }
  stripe.customers
    .create({ email: email, source: token })
    .then(customer => {
      stripe.charges.create({
        amount,
        description: name,
        currency: "usd",
        customer: customer.id
      });
    })
    .then(charge => {
      // res.send("successfully");

      const update = { subscribed: true, subscribedDate: new Date() };
      UserModel.findByIdAndUpdate(userID, update, { new: true })
        .then(user => {
          const { name, email, subscribed, subscribedDate } = user;
          res.json({ name, email, subscribed, subscribedDate });
        })
        .catch(err => res.send("error"));
    })
    .catch(err => res.send(err));
});

export default Router;
