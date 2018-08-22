import React from "react";
// import Axios from "axios";
// import StripeCheckout from "react-stripe-checkout";
import Stripe from "./stripe";

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
