import React from "react";
import "./Billing.css";

//import Sidenav from "../Sidenav/sidenav";

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly: false,
      annual: false
    };
  }

  onChange = event => {
    this.setState({
      [event.target.name]: true
    });
  };

  render() {
    return (
      <div>
        {/* <Sidenav /> */}
        <form>
          <fieldset>
            <legend>Choose Your Subscription</legend>
            <div>
              <input
                name="monthly"
                id="monthly"
                type="checkbox"
                onChange={this.onChange}
              />
              <label for="monthly">1 Year Subscription - $9.99</label>
            </div>
            <div>
              <input
                name="annual"
                id="annual"
                type="checkbox"
                onChange={this.onChange}
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
