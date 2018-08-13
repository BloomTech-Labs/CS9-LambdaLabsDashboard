import React from "react";
import "./Settings.css";

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      oldPw: "",
      newPw: ""
    };
  }

  submitForm(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <form className="settings" onSubmit={this.submitForm.bind(this)}>
          <br />
          <label>Email:</label>{" "}
          <input
            type="text"
            name="email"
            onChange={event => this.setState({ email: event.target.value })}
          />
          <br />
          <label>Old Password:</label>{" "}
          <input
            type="text"
            name="oldPw"
            onChange={event => this.setState({ oldPw: event.target.value })}
          />
          <br />
          <label>New password:</label>{" "}
          <input
            type="text"
            name="newPw"
            onChange={event => this.setState({ newPw: event.target.value })}
          />
          <br />
          <p>
            <button className="styled">Save</button>
          </p>
        </form>
      </div>
    );
  }
}
