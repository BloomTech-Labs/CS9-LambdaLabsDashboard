import React from "react";
import Stripe from "./Stripe";

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
      <div className="paymentWrapper">
        <div className="payment">
          <Stripe />
        </div>
      </div>
    );
  }
}
