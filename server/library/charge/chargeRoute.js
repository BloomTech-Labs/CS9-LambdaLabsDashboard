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
  const { name, email, amount, id } = req.body;
  console.log("====>", id);
  console.log("====>", email);
  if(!id) return res.send("there is no token");
  stripe.customers.create({ email, id })
    .then(customer => {
      stripe.charges.create({ 
        amount,
        description: name,
        currency: "usd",
        customer: customer.id
      })
    })
    .then(charge => {
      const update = { subscribed: true, subscribedDate: new Date() };
      UserModel.findByIdAndUpdate(userID, update, { new: true })
        .then(user => {
          const { name, email, subscribed, subscribedDate } = user;
          res.json({ name, email, subscribed, subscribedDate });
        })
        .catch(err => res.send('error'))
    })
    .catch(err => res.send(err));
});

export default Router;
