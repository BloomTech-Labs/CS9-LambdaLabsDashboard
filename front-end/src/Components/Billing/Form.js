// import React, { Component } from "react";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { CardElement, injectStripe } from "react-stripe-elements";
import Axios from "axios";
import { updateUserInfo } from "../../Actions/Database";
import CheckIcon from "../../pictures/check.svg";

const baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";

  class CheckoutForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // complete: false,
      // monthly: false,
      // annual: false,
      classes: 'pay'
    };
  }

  submit = ev => {
    // const { monthly } = this.state;
    // const { userID, userName, userEmail, stripe, updateUserInfo } = this.props;
    // const amount = monthly ? 999 : 2999;
    // stripe
    //   .createToken({ name: userName, email: userEmail })
    //   .then(res1 => {
    //     console.log("===>res1", res1);
    //     const { token } = res1;

    //     const { id, email } = token;
    //     Axios.post(`${baseURL}/charge/${userID}`, {
    //       name: userName,
    //       email,
    //       amount,
    //       token: id
    this.setState({ classes: 'pay pay-loading' }, () => {
      const { price: amount, userID, userName: name, userEmail: email, stripe, updateUserInfo, history } = this.props;
      stripe.createToken({ name, email })
        .then(res1 => {
          const { token } = res1;
          const { id } = token; 
          Axios.post(`${baseURL}/charge/${userID}`, { name, email, amount, token: id })
            .then(res => {
              updateUserInfo(res);
              this.setState({ classes: 'pay pay-loading pay-success', error: false }, () => {
                setTimeout(() => {
                  this.setState({ classes: 'pay'});
                  history.push('classes');
                }, 600);
              });
            })
            .catch(err => this.error());
        })
  //         .then(res2 => updateUserInfo(res2))
  //         .catch(err => this.setState({ error: true }));
  //     })
  //     .catch(err => this.setState({ error: true }));
  // };
        .catch(err => this.error());
      });
    }
  // onChange = e => {
  //   if (e.target.name === "annual") {
  //     this.setState({ annual: true, monthly: false });
  //   } else {
  //     this.setState({ annual: false, monthly: true });
  //   }
  // };
  error = () => this.setState({ error: true, classes: 'pay' });

  render = () => {
    const { classes, error } = this.state;
    return (
      <div className="payment">
        <div className="checkout">
          {/* <p>Please enter your payment details</p> */}
          <h2>Please enter your payment details</h2>
          {
            error &&
            <h3>Please check your credentials and try again</h3>
          }

          <CardElement
            style={{
              base: {
                color: "#32325d",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "#95A1AE"
                },
                ":-webkit-autofill": {
                  color: "#32325d"
                }
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
                ":-webkit-autofill": {
                  color: "#fa755a"
                }
              }
            }}
          />
          {/* <button onClick={this.submit}>Send</button> */}
          <button
            className={classes} 
            onClick={this.submit}>
            Confirm
            <img src={CheckIcon} alt="delete class" />
          </button>
        </div>
      </div>
    );
  };
}

const mSTP = ({ Navigation, Database }) => {
  const { userID } = Navigation;
  const { userName, userEmail } = Database;
  return { userID, userName, userEmail };
};

export default connect(
  mSTP,
  { updateUserInfo }
)(injectStripe(CheckoutForm));
