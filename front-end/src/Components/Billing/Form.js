import React, { Component } from "react";
import { connect } from 'react-redux';
import { CardElement, injectStripe } from "react-stripe-elements";
import Axios from "axios";
import { updateUserInfo } from '../../Actions/Database'; 

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

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
    ev.preventDefault();
    const { monthly, name, email } = this.state;
    const { userID, stripe, updateUserInfo } = this.props;
    const amount = monthly ? 999 : 2999;
    stripe.createToken({ name, email })
      .then(res1 => {
        const { token } = res1;
        const { id, email } = token;
        Axios.post(`${baseURL}/charge/${userID}`, { name, email, amount, id })
          .then(res2 => updateUserInfo(res2))
          .catch(err => this.setState({ error: true }));
      })
      .catch(err => this.setState({ error: true}));
  };

  onChange = e => {
    if (e.target.name === "annual") {
      this.setState({ annual: true, monthly: false });
    } else {
      this.setState({ annual: false, monthly: true });
    }
  };

  eventHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
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

const mSTP = ({ Navigation }) => {
  return { userID: Navigation.userID };
}

export default connect(mSTP, { updateUserInfo })(injectStripe(CheckoutForm));
