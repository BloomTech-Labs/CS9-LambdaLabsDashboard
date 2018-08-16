import React from "react";
import axios from "axios";

import "./settings.css";

const URL = "https://localhost/updatesettings";
export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldEmail: "",
      newEmail: "",
      oldPw: "",
      newPw: ""
    };
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log("firing off", this.state, URL);
    // axios
    //   .post(URL, {
    //     oldEmail: this.state.oldEmail,
    //     newEmail: this.state.newEmail,
    //     oldPw: this.state.oldPw,
    //     newPw: this.state.newPw
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .then(error => {})
    //   .then(error => {
    //     console.log(error);
    //   });
  };

  render() {
    return (
      <div>
        <form className="settings" onSubmit={this.onSubmit}>
          <h1>Update Settings</h1>
          <br />
          <label>Email:</label>{" "}
          <input
            type="email"
            name="oldEmail"
            value={this.state.oldEmail}
            onChange={this.onChange}
          />
          <br />
          <label>New Email:</label>{" "}
          <input
            type="email"
            name="newEmail"
            value={this.state.newEmail}
            onChange={this.onChange}
          />
          <br />
          <label>Old Password:</label>{" "}
          <input
            type="password"
            name="oldPw"
            value={this.state.oldPw}
            onChange={this.onChange}
          />
          <br />
          <label>New password:</label>{" "}
          <input
            type="password"
            name="newPw"
            value={this.state.newPw}
            onChange={this.onChange}
          />
          <br />
          <p>
            <button className="styled">Update</button>
          </p>
        </form>
      </div>
    );
  }
}
