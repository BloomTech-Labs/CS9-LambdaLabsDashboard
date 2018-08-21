import React from "react";
import Axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Stripe from "./stripe";
// const stripe = require("stripe-client")("pk_test_dtZeEKgd6FSjpH2sFi8RAYFa");

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly: false,
      annual: false,

      information: {
        card: {
          number: "4242424242424242",
          exp_month: "02",
          exp_year: "21",
          cvc: "999",
          name: "Billy Joe"
        }
      },
      amount: 9.99
    };
  }

  onToken = token => {
    Axios.post("http://localhost:4000/charge", {token: JSON.stringify(token)})
      .then(response => {
        console.log(response.body);
      })
      .catch(error => {
        console.log(error);
      });
  };
  switching = () => {
    if (this.state.monthly) {
      return 999;
    }
    if (this.state.annual) {
      return 2999;
    }
  };
  onChange = event => {
    this.setState({
      [event.target.name]: true
    });
    //Make the checking off of one checkbox
    //deselect the other
    //Remove logic from render
  };

  onSubmit = event => {
    event.preventDefault();
    console.log("firing off", this.state, URL);
    //TODO code for stripe
  };

  // render() {
  //   console.log("monthly", this.state.monthly);
  //   console.log("annually", this.state.annual);
  //   // let amount;
  //   // if (this.state.monthly) {
  //   //   amount = 999;
  //   //   this.state.annual = false;
  //   // }
  //   // if (this.state.annual) {
  //   //   amount = 2999;
  //   //   this.state.monthly = false;
  //   // }
  //   const { amount } = this.state;
  //   //   annual: false
  //   // };
  // }

  render() {
    return (
      <div>
        <h1>Welcome to Payments</h1>
{/*        <Stripe />*/}
      </div>
    );
  }
}
