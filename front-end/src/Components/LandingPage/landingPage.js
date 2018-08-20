import React, { Component } from 'react';
import axios from 'axios';


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      user: "",
      userpassword: ""
    }
  }

  eventHandler = (event) => {
    this.setState({
      [event.target.name]:
        event.target.value
    })
  }

  submitUser = () => {
    const object = {
      username: this.state.user,
      password: this.state.userpassword,
    }
    console.log("===>", object)
    const promise = axios.post("http://localhost:4000/user", object);
    promise
      .then(response => {
        console.log(response.data)
      })
      .catch(
        error => { console.log(error) }
      )
  }

  userLogin = () => {
    const object = {
      username: this.state.username,
      password: this.state.password,
    }
    console.log("===>", object)
    const promise = axios.post("http://localhost:4000/login", object);
    promise
      .then(response => {
        console.log(response.data)
      })
      .catch(
        error => { console.log(error) }
      )
  }

  render() {
    return (
      <div>
        <div className="content">
          <h2>Landing Page</h2>
          <div>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={this.eventHandler}
            />
            <input
              type="text"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.eventHandler}
            />
            <button onClick={this.userLogin}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
