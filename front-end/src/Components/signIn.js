import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import JumboTron from './LandingPage/jumbotron';

class SignIn extends Component {
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
                    <JumboTron />
                    <div>
                        {/* <button>Sign In</button> */}
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
                        <input type="text"
                            placeholder="user"
                            name="user"
                            value={this.state.user}
                            onChange={this.eventHandler}
                        />
                        <input type="text"
                            placeholder="userpassword"
                            name="userpassword"
                            value={this.state.userpassword}
                            onChange={this.eventHandler}
                        />
                        {/* <input type="text"
          placeholder="email"
          name="email"
          value={this.state.email}
          onChange={this.eventHandler}
        /> */}
                        <button onClick={this.submitUser}>Submit</button>
                    </div>
                    <button>Sign Out</button>
                </div>

            </div>
        );
    }
}

export default SignIn;