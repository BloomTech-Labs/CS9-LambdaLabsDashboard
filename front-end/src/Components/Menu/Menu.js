import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleMenu } from '../../Actions/Navigation';

class Menu extends Component {

  shouldComponentUpdate = ({ classes }) => {
    if(classes !== this.props.classes) return true;
    return false;
  }

  navigate = route => {
    const { history, toggleMenu } = this.props;
    toggleMenu();
    setTimeout(() => this.props.history.push(route), 300);
  }

  render = () => {
    console.log(this.props);
    const { classes } = this.props;
    return (
      <div className={classes}>
        <div>
          <a onClick={() => this.navigate('/classes')}>Classes</a>
          <a onClick={() => this.navigate('/billing')}>Billing</a>
          <a onClick={() => this.navigate('/projects')}>Projects</a>
          <a onClick={() => this.navigate('/project-dashboard')}>Project Dashboard</a>
          <button>Logout</button>
        </div>
      </div>
    );
  }
}

const mSTP = ({ Navigation }) => {
  return { classes: Navigation.menuClasses}
}

export default withRouter(connect(mSTP, { toggleMenu })(Menu));
