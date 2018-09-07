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
      classes: 'pay'
    };
  }

  submit = ev => {
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
        .catch(err => this.error());
    });
  }

  error = () => this.setState({ error: true, classes: 'pay' });

  render = () => {
    const { classes, error } = this.state;
    return (
      <div className="payment">
        <div className="checkout">
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
