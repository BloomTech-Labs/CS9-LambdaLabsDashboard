import React, { Component } from "react";
import { StripeProvider } from "react-stripe-elements";

import MyStoreCheckout from "./myStoreCheckout";
class stripeApp extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_iCsQ37ZO7RVr0Kec4pweqCU5">
        <MyStoreCheckout />
      </StripeProvider>
    );
  }
}

export default stripeApp;
