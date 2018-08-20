import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Burger from './Burger/Burger';

export default class Header extends Component {
  render = () => {
    return (
      <header className="header">
      <div>
        <h1><Link to= "/">LABS</Link></h1> {/* just wanted to link it to the landing page and not lose your css fix as you need to */}
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
