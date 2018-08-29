import React from "react";
import axios from "axios";

// import "./settings.css";

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
      id: ""
    };
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const object = {
      email: this.state.email,
      // userName: this.state.userName,
      password: this.state.password
    };
    const URL = `https://localhost/users/${this.state.id}`;

    console.log("firing off", this.state, URL);
    axios
      .put(URL, object)
      .then(res => {
        console.log(res.data);
      })
      .then(error => {
        console.log(error);
      });
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
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <br />
          <label>Password:</label>{" "}
          <input
            type="password"
            name="password"
            value={this.state.password}
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
