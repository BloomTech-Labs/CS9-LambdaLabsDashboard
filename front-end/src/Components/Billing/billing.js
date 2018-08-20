import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Stripe from "./stripe";
const stripe = require("stripe-client")("pk_test_dtZeEKgd6FSjpH2sFi8RAYFa");

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly: false,
      annual: false
    };
  }

  render() {
    return (
      <div>
        <h1>Welcome to Payments</h1>
        <Stripe />
      </div>
    );
  }
}
