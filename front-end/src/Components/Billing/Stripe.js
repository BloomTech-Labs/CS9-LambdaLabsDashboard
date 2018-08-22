import React, { Component } from "react";
import { StripeProvider } from "react-stripe-elements";

import MyStoreCheckout from "./MyStoreCheckout";
class stripeApp extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_dtZeEKgd6FSjpH2sFi8RAYFa">
        <MyStoreCheckout />
      </StripeProvider>
    );
  }
}

export default stripeApp;
