import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Stripe from "./stripe";
<<<<<<< HEAD
=======
const stripe = require("stripe-client")("pk_test_dtZeEKgd6FSjpH2sFi8RAYFa");
>>>>>>> 646ac2750864df380e774b8b3c82efb1dfe860b3

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
