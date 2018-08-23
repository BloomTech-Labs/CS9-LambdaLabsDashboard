import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux'; 
import { auth } from '../../Actions/Navigation';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      user: "",
      userpassword: ""
    };
  }

  eventHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitUser = () => {
    const { user, userpassword } = this.state;
    const { history, auth } = this.props;
    const object = {
      username: user,
      password: userpassword
    };
    console.log("===>", object);
    const promise = axios.post("http://localhost:4000/users", object);
    promise
      .then(response => {
        console.log(response.data);
        const { token } = response.data;
        auth(token);
        history.push('/projects');
      })
      .catch(error => {
        console.log(error);
      });
  };

  userLogin = () => {
    const { username, password } = this.state; 
    const object = { username, password };
    console.log("===>", object);
    const promise = axios.post("http://localhost:4000/login", object);
    promise
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

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

          <div>
            <input
              type="text"
              placeholder="user"
              name="user"
              value={this.state.user}
              onChange={this.eventHandler}
            />
            <input
              type="text"
              placeholder="userpassword"
              name="userpassword"
              value={this.state.userpassword}
              onChange={this.eventHandler}
            />
            <button onClick={this.submitUser}>Submit</button>
          </div>
          <button>Sign Out</button>
        </div>
      </div>
    );
  }
}

export default connect(null, { auth })(LandingPage);
