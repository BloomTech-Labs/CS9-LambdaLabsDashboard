import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../../pictures/mergelogo.png';

class NotFound extends Component {
  
  navigate = route => {
  	this.props.history.push(route);
  }

  render = () => {
  	const { lastClass } = this.props;
    return (
      <div className='not-found'>
      	<div>
      		<img src={Logo} alt="logo" />
      		<h1>We're sorry!</h1>
      		<h2>We cannot find the page you're looking for</h2>
      		<div className='link-options'>
      			<h3>Maybe we can help:</h3>
      			<div className='links'>
      				<button onClick={() => this.navigate('classes')}>Classes</button>
      				<button onClick={() => this.navigate('settings')}>Settings</button>
      				{
      					lastClass &&
      					<button onClick={() => this.navigate(`projects/${lastClass.className}`)}>{lastClass.className}</button>
      				}
      			</div>
      		</div>
      	</div>
      </div>
    );
  }
}

const mSTP = ({ Navigation, Database }) => {
	const { auth } = Navigation;
	const { classes } = Database;
	const { length } = classes;
	return { auth, lastClass: length > 0 ? classes[length - 1] : null };
}

export default connect(mSTP)(NotFound);