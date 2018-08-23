import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Burger from './Burger/Burger';
import { logout } from '../../Actions/Navigation';

class Header extends Component {

  logout = () => {
    const { history, logout } = this.props;
    logout();
    history.push('/');
  }

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
        <button onClick={this.logout}>Logout</button>
      </div>
    </header>
    );
  }
}

export default connect(null, { logout })(Header);
