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
    }
  }
  
  submit = ev => {
    const { monthly } = this.state;
    const { userID, userName, userEmail, stripe, updateUserInfo } = this.props;
    const amount = monthly ? 999 : 2999;
    stripe.createToken({ name: userName, email: userEmail })
      .then(res1 => {
        const { token } = res1;
        const { id, email } = token;
        Axios.post(`${baseURL}/charge/${userID}`, { name: userName, email, amount, id })
          .then(res2 => updateUserInfo(res2))
          .catch(err => this.setState({ error: true }));
      })
      .catch(err => this.setState({ error: true}));
  }

  onChange = e => {
    if (e.target.name === "annual") {
      this.setState({ annual: true, monthly: false });
    } else {
      this.setState({ annual: false, monthly: true });
    }
  }

  render() {
    return (
      <div className="payment">
        <div className="checkout">
          <p>Please enter your payment details</p>
          <CardElement style={{
            base: {
              color: '#32325d',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '16px',
              '::placeholder': {
                color: '#95A1AE'
              },
              ':-webkit-autofill': {
                color: '#32325d',
              },
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a',
              ':-webkit-autofill': {
                color: '#fa755a',
              },
            }
          }}/>
          <button onClick={this.submit}>Send</button>
        </div>
      </div>
    );
  }
}

const mSTP = ({ Navigation, Database }) => {
  const { userID } = Navigation;
  const { userName, userEmail } = Database;
  return { userID, userName, userEmail };
}

export default connect(mSTP, { updateUserInfo })(injectStripe(CheckoutForm));
