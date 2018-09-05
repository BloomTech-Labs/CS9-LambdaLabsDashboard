import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Burger from './Burger/Burger';
import { logout } from '../../Actions/Navigation';
import Logo from '../../pictures/mergelogo.png';

class Header extends PureComponent {

  logout = () => {
    const { history, logout } = this.props;
    logout();
    history.push('/');
  }

  render = () => {
    const { classes, subscribed } = this.props;
    return (
      <header className="header">
        <div>
          <img src={Logo} alt="logo" />
          <Burger />
          <nav className="header-links">
            <Link to="/classes">Classes</Link>
            {
              classes.map(c => {
                const { className } = c;
                return (
                  <Link 
                    key={className}
                    to={`/projects/${className}`}>{className}</Link>  
                );
              })
            }
            <Link to="/settings">Settings</Link>
            {
              subscribed && <Link to="/billing">Billing</Link>
            }
          </nav>
          <button onClick={this.logout}>Logout</button>
        </div>
      </header>
    );
  }
}

const mSTP = ({ Database }) => {
  const { classes, subscribed } = Database;
  return { classes, subscribed }; 
}

export default connect(mSTP, { logout })(Header);
