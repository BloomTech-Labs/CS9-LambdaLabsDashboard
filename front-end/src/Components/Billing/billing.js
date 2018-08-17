import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

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
      }
    };
  }

  onToken = token => {
    fetch("http://localhost:4000/charge", {
      method: "POST",
      body: JSON.stringify(token)
    })
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
      <div>
        <div>Choose Your Subscription</div>
        <div>
          <label htmlFor="monthly">1 Year Subscription - $9.99</label>

          <input
            name="monthly"
            id="monthly"
            type="checkbox"
            onClick={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="annual">1 Year Premium Subscription - $29.99</label>
          <input
            name="annual"
            id="annual"
            type="checkbox"
            onClick={this.onChange}
          />
        </div>
        <StripeCheckout
          id={this.state.id}
          name="test name"
          description="test item"
          amount={amount}
          token={this.onToken}
          currency="USD"
          stripeKey="pk_test_dtZeEKgd6FSjpH2sFi8RAYFa"
        />
      </div>
    );
  }
}
