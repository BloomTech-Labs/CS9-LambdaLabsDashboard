import React, { Component } from "react";
// import { connect } from 'react-redux';
import { StripeProvider, Elements } from "react-stripe-elements";
import Form from "./Form";
import Options from "./Options/Options";

export default class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearly: false,
      monthly: false,
      price: ""
    };
  }

  select = (price, title) => {
    window.scrollTo(0, 0);
    this.setState({ [title.toLowerCase()]: true, price });
  };

  render = () => {
    // const { subscribed } = this.props;
    const { yearly, monthly, price } = this.state;
    return (
      <div className="payment-wrapper">
        {yearly || monthly ? (
          // <div className="payment">
          <div>
            <StripeProvider apiKey="pk_test_dtZeEKgd6FSjpH2sFi8RAYFa">
              <Elements>
                <Form
                  price={price}
                  history={this.props.history} />
              </Elements>
            </StripeProvider>
          </div>
        ) : (
          <Options select={this.select} />
        )}
      </div>
    );
  };
}

// const mSTP = ({ Database }) => {
//   return { subscribed: Database.subscribed };
// }

// export default connect(mSTP)(Billing);
