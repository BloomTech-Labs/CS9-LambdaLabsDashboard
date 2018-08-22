import React from "react";
import Axios from "axios";
// import StripeCheckout from "react-stripe-checkout";
import Stripe from "./Stripe";
import checkout from './billing.css';
import payment from './billing.css';

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
        <div className="payment">
          <h1>Welcome to Payments</h1>
            <Stripe />
        </div>
      </div>
    );
  }
}
