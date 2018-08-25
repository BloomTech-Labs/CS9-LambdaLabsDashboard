import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render = () => {
  	const { component: CurrentRoute, location, auth, userID, ...rest } = this.props;
    return (
      <Route
      	location={location} 
      	{...rest} 
      	render={props => {
		      return auth && userID ? <CurrentRoute {...props} /> :
	        <Redirect to={{ pathname: '/', state: { from: location } }} />
		    }} />
		);
  }
}

const mSTP = ({ Navigation }) => {
  const { auth, userID } = Navigation;
	return { auth, userID };
}

export default connect(mSTP, null, null, { pure: false })(PrivateRoute);