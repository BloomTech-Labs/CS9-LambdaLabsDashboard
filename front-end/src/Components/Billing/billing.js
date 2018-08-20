import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Sidenav from "../Sidenav/sidenav";
import "./billing.css";
const stripe = require("stripe-client")("pk_test_dtZeEKgd6FSjpH2sFi8RAYFa");

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly: false,
      annual: false
    };
  }

  onToken = token => {
    axios
      .post("http://localhost:4000/charge", {
        body: JSON.stringify(token)
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onChange = event => {
    alert("hello");
    this.setState({
      [event.target.name]: true
    });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log("firing off", this.state, URL);
    //TODO code for stripe
  };

  render() {
    console.log("monthly", this.state.monthly);
    console.log("annually", this.state.annual);
    let amount;
    if (this.state.monthly) {
      amount = 999;
      this.state.annual = false;
    }
    if (this.state.annual) {
      amount = 2999;
      this.state.monthly = false;
    }
    return (
      <div className="billing">
        <form>
          <legend>Choose Your Subscription</legend>
          <div>
            <input
              name="monthly"
              id="monthly"
              type="checkbox"
              onClick={this.onChange}
            />
            <label for="monthly">1 Year Subscription - $9.99</label>
          </div>
          <div>
            <input
              name="annual"
              id="annual"
              type="checkbox"
              onChange={this.onChange}
            />
            <label for="annual">1 Year Premium Subscription - $29.99</label>
          </div>
        </form>

        {/* <StripeCheckout
          id={this.state.id}
          name="test name"
          description="test item"
          amount={amount}
          token={this.onToken}
          currency="USD"
          stripeKey="pk_test_dtZeEKgd6FSjpH2sFi8RAYFa"
        /> */}

        <form
          action="http://localhost:4000/charge"
          method="post"
          id="payment-form"
        >
          <div class="form-row">
            <label for="card-element">Credit or debit card</label>
            <div id="card-element" />

            <div id="card-errors" role="alert" />
          </div>

          <button>Submit Payment</button>
        </form>
      </div>
    );
    //)

    //   {/* <Sidenav /> */}

    //     <input type="checkbox" name="vehicle" value="Car" checked/>
    //     <input type="submit" value="Submit">

    //     1 Year Subscription - $9.99
    //     <input
    //       name="monthly"
    //       id="monthly"
    //       type="checkbox"
    //       onClick={this.onChange}
    //     />

    //     1 Year Premium Subscription - $29.99
    //     <input
    //       name="annual"
    //       id="annual"
    //       type="checkbox"
    //       onClick={this.onChange}
    //     />

    //   <StripeCheckout
    //     id={this.state.id}
    //     name="test name"
    //     description="test item"
    //     amount={amount}
    //     token={this.onToken}
    //     currency="USD"
    //     stripeKey="pk_test_dtZeEKgd6FSjpH2sFi8RAYFa"
    //   />

    // </div>
  }
}
