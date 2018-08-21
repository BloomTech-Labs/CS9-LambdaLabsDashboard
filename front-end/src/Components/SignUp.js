import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'


class SignUp extends Component {
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
    signout = () => {
        localStorage.removeItem('token')
        this.props.history.push('/SignIn')
    }
    render() {
        return (
            <div>
                <div className="content">
                    <h2>Sign Up</h2>
                    <div>
                        <input type="text"
                            placeholder="user"
                            name="user"
                            value={this.state.user}
                            onChange={this.eventHandler}
                        /></div>
                    <input type="text"
                        placeholder="userpassword"
                        name="userpassword"
                        value={this.state.userpassword}
                        onChange={this.eventHandler}
                    />
                    <input type="text"
                        placeholder="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.eventHandler}
                    />
                </div>
                <div><button onClick={this.submitUser}>Submit</button></div>
            </div>
            <div><h3>Already Signed in? </h3></div>
            <div><Button onClick={() => { this.props.history.replace('/signin') }}>Sign in</Button></div>
                    </div >
                </div >


        );
    }
}

export default SignUp;
