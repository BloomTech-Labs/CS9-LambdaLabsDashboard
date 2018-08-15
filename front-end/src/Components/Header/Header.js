import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Burger from './Burger/Burger';

export default class Header extends Component {
  render = () => {
    return (
      <header className="header">
      <div>
        <h1>LABS</h1>
        <Burger />
        <nav className="header-links">
          <Link to="/classes">Classes</Link>
          <Link to="/billing">Billing</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/project-dashboard">Project Dashboard</Link>
        </nav>
        <button>Logout</button>
      </div>
    </header>
    );
  }
}
