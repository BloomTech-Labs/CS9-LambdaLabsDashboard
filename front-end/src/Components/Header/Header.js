import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Burger from './Burger/Burger';
import { logout } from '../../Actions/Navigation';

class Header extends PureComponent {

  logout = () => {
    const { history, logout } = this.props;
    logout();
    history.push('/');
  }

  render = () => {
    const { classes } = this.props;
    return (
      <header className="header">
      <div>
        <h1><Link to= "/">LABS</Link></h1> {/* just wanted to link it to the landing page and not lose your css fix as you need to */}
        <Burger />
        <nav className="header-links">
          <Link to="/classes">Classes</Link>
          {
            classes.map(c => {
              const { className, _id } = c;
              console.log(_id);
              return (
                <Link 
                  key={className}
                  to={{pathname: `/projects/${className}`, state: {_id}}}>{className}</Link>  
              );
            })
          }
          <Link to="/billing">Billing</Link>
          <Link to="/project-dashboard">Project Dashboard</Link>
          <Route to='/signOut'></Route>
        </nav>
        <button onClick={this.logout}>Logout</button>
      </div>
    </header>
    );
  }
}

const mSTP = ({ Database }) => {
  const { classes } = Database;
  return { classes }; 
}

export default connect(mSTP, { logout })(Header);
