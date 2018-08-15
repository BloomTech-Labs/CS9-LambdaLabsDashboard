import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Sidenav extends Component {
    render() {
        return (
            <div className="side-nav">
                <ul>
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
                    <Link to="/project-dashboard">
                        <li>Project Dashboard</li>
                    </Link>
                </ul>
            </div>
        );

    }
}

export default Sidenav;

