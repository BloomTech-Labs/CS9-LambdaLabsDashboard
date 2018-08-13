import React from "react";
import "./Billing.css";

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox: false;
    };
  }

  //TODO i dont know how to set state with checkboxes

  submitForm(event) {
    event.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          <fieldset>
            <legend>Choose Your Subscription</legend>
            <div>
              <input
                name="subscriptionType"
                value="monthly"
                id="monthly"
                type="checkbox"
              />
              <label for="monthly">1 Year Subscription - $9.99</label>
            </div>
            <div>
              <input
                name="subscriptionType"
                value="annual"
                id="annual"
                type="checkbox"
              />
              <label for="annual">1 Year Premium Subscription - $29.99</label>
            </div>
          </fieldset>
          <p>
            <button className="styled">Buy Now</button>
          </p>
        </form>
      </div>
    );
  }
}
