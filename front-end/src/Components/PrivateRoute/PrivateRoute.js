import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render = () => {
  	const { component, location, auth, ...rest } = this.props;
    return (
      auth ? <Route {...rest} component={component} />
      : <Redirect to={{ pathname: '/', state: { from: location } }} />
    );
  }
}

const mSTP = ({ Navigation }) => {
	return { auth: Navigation.auth };
}

export default connect(mSTP)(PrivateRoute);