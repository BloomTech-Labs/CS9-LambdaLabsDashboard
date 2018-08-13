import React from "react";
import "./Billing.css";

export default class Billing extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string
  // };
  // constructor(props) {
  //   super(props);
  //   state = {

  //   }
  // }
  render() {
    return (
      <div>
        <form>
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
            <button class="styled">Buy Now</button>
          </p>
        </form>
      </div>
    );
  }
}
