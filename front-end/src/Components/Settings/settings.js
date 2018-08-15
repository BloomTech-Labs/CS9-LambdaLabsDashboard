import React from "react";
import "./settings.css";

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
  };

  render() {
    return (
      <div>
        <form className="settings">
          <br />
          <label>Email:</label>{" "}
          <input
            type="text"
            name="email"
            value={this.state.email}
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
            <button className="styled">Save</button>
          </p>
        </form>
      </div>
    );
  }
}
