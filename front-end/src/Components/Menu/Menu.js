import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleMenu } from '../../Actions/Navigation';

class Menu extends Component {

  shouldComponentUpdate = ({ menuClasses }) => {
    if(menuClasses !== this.props.menuClasses) return true;
    return false;
  }

  navigate = route => {
    const { history, toggleMenu } = this.props;
    toggleMenu();
    setTimeout(() => history.push(route), 300);
  }

  render = () => {
    const { menuClasses, classes } = this.props;
    return (
      <div className={menuClasses}>
        <div>
          <a onClick={() => this.navigate('/classes')}>Classes</a>
          {
            classes.map(c => {
              const { className } = c;
              return (
                <a
                  key={c} 
                  onClick={() => this.navigate('/projects')}>{className}</a>
              );
            })
          }
          <a onClick={() => this.navigate('/billing')}>Billing</a>
          <a onClick={() => this.navigate('/project-dashboard')}>Project Dashboard</a>
          <button>Logout</button>
        </div>
      </div>
    );
  }
}

const mSTP = ({ Navigation, Database }) => {
  const { menuClasses } = Navigation;
  const { classes } = Database;
  return { menuClasses, classes}
}

export default withRouter(connect(mSTP, { toggleMenu })(Menu));
