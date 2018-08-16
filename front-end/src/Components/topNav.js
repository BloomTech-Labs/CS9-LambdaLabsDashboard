import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class TopNav extends Component {
    render() {
        return (
            <div>
                <div>
                    <Route exact path="./components/signIn.js" />
                    <Route exact path="./components/signUp.js" />
                </div>
                <ul>
                    <li Link to="/signin">Sign in</li>
                    <li Link to="/signup">Sign up</li>
                </ul>
            </div>
        );
    }
}
export default TopNav;