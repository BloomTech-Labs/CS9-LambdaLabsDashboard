import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import './_landingPage.scss'

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
      <div id="landingPage">
        <div className="content">
          <h2>Landing Page</h2>
          <div>
            <Button onClick={() => { this.props.history.replace('/login') }}>
              Log In
            </Button>
            <Button onClick={() => { this.props.history.replace('/signup') }}>
              Sign Up
            </Button>
            
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
