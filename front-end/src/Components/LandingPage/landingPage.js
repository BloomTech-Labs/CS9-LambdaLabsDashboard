import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import axios from 'axios';
import Jumbotron from '../LandingPage/jumbotron';
import { Button } from 'react-bootstrap';
import {signIn} from '../signIn'
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
          <Jumbotron />
          <Button onClick={() => { this.props.history.replace('/signIn') }}>Sign in</Button>
          <Button onClick={() => { this.props.history.replace('/signup') }}>Sign Up</Button>
          <button>Sign Out</button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
