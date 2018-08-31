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
      amount: "",
      email: "",
      name: ""
    };
  }

  submit = ev => {
    let amount = this.state.monthly ? 999 : 2999;
    ev.preventDefault();
    this.props.stripe
      .createToken({
        name: this.state.name,
        email: this.state.email
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

  eventHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log("monthly", this.state.monthly);
    console.log("annually", this.state.annual);
    console.log(this.state.amount);
    return (
      <div className="payment">
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <form>
            <legend>Choose Your Subscription</legend>
            <div>
              <input
                type="text"
                placeholder="name"
                name="name"
                value={this.state.name}
                onChange={this.eventHandler}
              />
              <input
                type="text"
                placeholder="email"
                name="email"
                value={this.state.email}
                onChange={this.eventHandler}
              />
              <input
                name="monthly"
                id="monthly"
                type="checkbox"
                checked={this.state.monthly}
                amount="999"
                onClick={this.onChange}
              />
              <label htmlFor="monthly">1 Year Subscription - $9.99</label>
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
              <label htmlFor="annual">
                1 Year Premium Subscription - $29.99
              </label>
            </div>
          </form>
          <button onClick={this.submit}>Send</button>
        </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
