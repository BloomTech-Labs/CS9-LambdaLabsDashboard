import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Sidenav extends Component {
    render() {
        return (<div>
            <ul className="sidenav">
                <Link to="/classes">
                    <li>Classes</li>
                </Link>
                <Link to="/billing">
                    <li>Billing</li>
                </Link>
                {/* <Link to="/settings">
                    <li>Settings</li>
                </Link> */}
                <Link to="/projects">
                    <li>Projects</li>
                </Link>
            </ul>
        </div>);

    }
}

export default Sidenav;

