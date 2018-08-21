import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      monthly: false,
      annual: false,
      amount: ""
    };
  }

  submit = ev => {
    let amount = 0;
    if (this.state.amount === "monthly") {
      amount = 999;
    }
    if (this.state.amount === "annual") {
      amount = 2999;
    }
    ev.preventDefault();
    let token = this.props.stripe
      .createToken({
        name: "trip ",
        email: "hilal@gmail.com"
      })
      .then(token => {
        console.log("amount", amount);
        console.log(token);
        const object = {
          token: token.token.id,
          email: token.token.email,
          amount: amount
        };
        let response = axios.post("http://localhost:4000/charge", object);
        response
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  // onChange = event => {
  //   console.log(event.target.id);
  //   alert("hello");
  //   this.setState({
  //     [event.target.name]: true,
  //     amount: event.target.id
  //   });
  // };
  onChange = event => {
    console.log(event.target.id);
    const { name } = event.target;
    if (name === "annual") {
      this.setState({
        annual: true,
        monthly: false
      });
    } else {
      this.setState({
        annual: false,
        monthly: true
      });
    }
  };

  render() {
    console.log("monthly", this.state.monthly);
    console.log("annually", this.state.annual);
    console.log(this.state.amount);
    // let amount;
    // if (this.state.monthly) {
    //   amount = 999;

    //   this.state.amount = amount;
    // }
    // if (this.state.annual) {
    //   amount = 2999;

    //   this.state.amount = amount;
    // }
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <form>
          <legend>Choose Your Subscription</legend>
          <div>
            <input
              name="monthly"
              id="monthly"
              type="checkbox"
              checked={this.state.monthly}
              amount="999"
              onClick={this.onChange}
            />
            <label for="monthly">1 Year Subscription - $9.99</label>
          </div>
          <div>
            <input
              name="annual"
              id="annual"
              type="checkbox"
              checked={this.state.annual}
              amount="2999"
              onClick={this.onChange}
            />
            <label for="annual">1 Year Premium Subscription - $29.99</label>
          </div>
        </form>
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
