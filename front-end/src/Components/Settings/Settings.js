import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import Check from '../../pictures/check.svg';
import { getUserInfo, updateUserInfo } from '../../Actions/Database';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	name: '',
    	email: '',
    	password: '',
    	newPassword: '',
    	classes: 'submit',
    	error: '',
    }
    this.nameReg = /\b[A-Z][-'a-zA-Z]+,?\s[A-Z][-'a-zA-Z]{0,19}\b/;
    this.emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    this.props.getUserInfo();
  }

  inputChange = (name, value) => {
  	this.setState({ [name]: value });
  }

  getMonthsRemaining = () => {
  	const { subscriptionDate } = this.props;
  	const startDate = new Date(subscriptionDate).getFullYear();
  	const today = new Date().getFullYear(); 
  	let diff = (today - startDate)*12;
  	diff += today.getMonth();
  	diff -= startDate.getMonth() + 1;
  	return diff <= 0 ? 0 : diff;
  }

  checkField = (field, prop) => {
  	return field !== this.props[prop] && field.length > 0 ? field : false;
  }

  checkPassword = password => {
  	return password.length > 4 ? password : false;
  }

  validateName = (name, updated, update) => {
  	if (this.nameReg.test(name)) {
  		update.name = name;
  		return { updated: true, update };
  	}
  	return { updated, update };
  }

  validateEmail = (email, updated, update) => {
  	if (this.emailReg.test(email)) {
  		update.email = email;
  		return { updated: true, update };
  	}
  	return { updated: false, update };
  }

  validatePassword = (password, updated, update, updateName) => {
  	if(password.length > 4) {
  		update[updateName] = password;
  		return { updated: true, update };
  	}
  	return { updated: false, update };
  }

  createUpdate = () => {
  	const { name, email, newPassword, password } = this.state;
  	let updated = false, update = {};
  	const newName = this.checkField(name, 'userName');
  	const newEmail = this.checkField(email, 'userEmail');
  	if(newName) {
  		({ updated, update } = this.validateName(newName, updated, update));
  		if(!updated) {
  			this.setState({ classes: 'submit', error: 'Please enter your name as it would appear on standard a identification' });
  			window.scrollBy(0,270);
  			return;
  		}
  	}
  	if(newEmail) {
  		({ updated, update } = this.validateEmail(newEmail, updated, update));
  		if(!updated) {
  			this.setState({ classes: 'submit', error: 'Please enter a valid email' });
  			return;
  		}
  	}
  	if(newPassword !== '') {
  		({ updated, update } = this.validatePassword(newPassword, updated, update, 'newPassword'));
  		if(!updated) {
  			this.setState({ classes: 'submit', error: 'Your new password must be more than 4 characters' });
  			return;
  		}
  		if(password.length < 5) {
  			this.setState({ classes: 'submit', error: 'Incorrect password' });
  			return;
  		} else {
  			({ updated, update } = this.validatePassword(password, updated, update, 'password'));
  		}
  	}
  	return updated ? update : false;
  }

  submit = () => {
  	this.setState({ classes: 'submit submit-loading' }, () => {
  		const update = this.createUpdate();
  		if(update === false) {
  			this.setState({ classes: 'submit', error: 'There were no updates to save' });
  		} else if(update) {
  			const { userID, updateUserInfo } = this.props;
  			Axios.put(`${baseURL}/users/${userID}`, update)
  				.then(res => {
  					const { data } = res;
  					console.log(data);
  					if(typeof data === 'string') {
  						this.setState({ classes: 'submit', error: data });
  					} else {
  						this.setState({ classes: 'submit submit-loading submit-success', error: '', name: '', email: '', password: '', newPassword: '' }, () => {
  							updateUserInfo(data);
  							setTimeout(() => this.setState({ classes: 'submit' }), 750);
  						});
  					}
  				})
  				.catch(err => this.setState({ classes: 'submit', error: err}))
  		}
  	});
  }

  render = () => {
  	const { name, email, password, newPassword, classes, error } = this.state;
  	const { userName, userEmail, subscribed } = this.props;
    return (
      <div className='settings'>
      	<div className='center'>
      		<h1>Settings</h1>
      		<h2 style={{
            marginBottom: userEmail !== '' ? '20px' : '50px'
          }}>You can update the settings of your choosing below</h2>
      		{
      			userEmail !== '' ? 
      			<div className='input-container'>
	      			{
	      				error !== '' && <h2>{error}</h2>
	      			}
	      			<Input 
	            	labelText='Name:'
	            	type='text'
	            	placeholder={userName}
	            	name='name'
	            	value={name}
	            	onChange={this.inputChange} />
	            <Input 
	            	labelText='Email:'
	            	type='email'
	            	placeholder={userEmail}
	            	name='email'
	            	value={email}
	            	onChange={this.inputChange} />
	            <Input 
	            	labelText='New password:'
	            	type='password'
	            	placeholder="New Password"
	            	name='newPassword'
	            	value={newPassword}
	            	onChange={this.inputChange} />
	            {
	            	newPassword !== '' &&
	            	<Input 
		            	labelText='Old password:'
		            	type='password'
		            	placeholder="Old password"
		            	name='password'
		            	value={password}
		            	onChange={this.inputChange} />
	            }
	            {
	            	subscribed &&
	            	<div className='subscription'>
	            		<div>
	            			<h3>Subscription:</h3>
	            			<h4>{`You have ${this.getMonthsRemaining} months remaining`}</h4>
	            		</div>
	            	</div>
	            }
	            <button
	            	className={classes} 
	            	onClick={this.submit}>
	            		Save
	            		<img src={Check} alt="Save new settings" />
	            	</button>
	      		</div>
	      		:
	      		<Loader dimensions={75} />
      		}
      	</div>
      </div>
    );
  }
}

const mSTP = ({ Navigation, Database }) => {
	const { userID } = Navigation;
	const { userName, userEmail, subscribed, subscriptionDate } = Database;
	return { userID, userName, userEmail, subscribed, subscriptionDate }; 
}

export default connect(mSTP, { getUserInfo, updateUserInfo })(Settings);