import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux'; 
import { auth } from '../../Actions/Navigation';
import CheckIcon from '../../pictures/check.svg';

class LandingPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      classes: 'login',
      name: '',
      email: '',
      password: '',
      newUser: false,
      loginErrors: "Error:",
      maxHeight: window.innerHeight
    }
    this.emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    this.nameReg = /\b[A-Z][-'a-zA-Z]+,?\s[A-Z][-'a-zA-Z]{0,19}\b/;
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.resize, true);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resize, true);
  }

  resize = () => {
    this.setState({ height: window.innerHeight });
  }

  focus = e => {
    e.target.parentNode.classList.add('focused');
  }

  blur = e => {
    const { value, parentNode } = e.target;
    if(value === "") {
      parentNode.classList.remove('focused');
    }
  }

  isNewUser = () => {
    this.setState(ps => {
      return { newUser: !ps.newUser, name: '' }
    });
  }

  submit = () => {
    this.setState({ classes: "login login-loading" }, () => {
      const { name, email, password, newUser } = this.state;
      if(newUser) {
        if(this.handleName(name)) {
          this.handleEmailPassword(email, password);
        } else {
          this.handleError('Your full name is required');
        }
      } else {
        this.handleEmailPassword(email, password);
      }
    });
  }

  handleName = name => {
    return this.nameReg.test(name);
  }

  handleEmailPassword = (email, password) => {
    if(this.emailReg.test(email)) {
      if(password.length > 4) {
        this.login();
      } else {
        this.handleError('Password must be more than 5 characters');
      }
    } else {
      this.handleError('Invalid Email. Please try again');
    }
  }

  handleError = err => {
    this.setState({ loginErrors: err, classes: "login"});
  }

  login = () => {
    const { newUser, name, email, password } = this.state;
    const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
    const location = newUser ? '/users' : '/login'; 
    const body = newUser ? { name, email, password } : { email, password };
    Axios.post(`${baseURL}${location}`, body)
      .then(res => {
        if(typeof res.data === 'object') {
          console.log(res);
          const { _id, token } = res.data;
          this.enter(_id, token);
        } else {
          this.handleError(res.data);
        }
      })
      .catch(err => {
        console.log(err);
        this.handleError('')
      })
  }

  enter = (id, token) => {
    const { auth, history } = this.props;
    this.setState({classes: "login login-loading login-remove"}, () => {
      setTimeout(() => {
        auth(id, token);
        history.push('/projects');
      }, 1500);
    });
  }

  render = () => {
    const { errors } = this.props;
    const { classes, name, email, password, loginErrors, newUser, maxHeight } = this.state;
    return(
      <section 
        className={classes}
        style={{maxHeight}}>
        <div>
          {
            newUser ? 
            <h1>
              <span>S</span>
              <span>i</span>
              <span>g</span>
              <span>n</span>
              <span>&nbsp;</span>
              <span>U</span>
              <span>p</span>
            </h1>
            :
            <h1>
              <span>L</span>
              <span>o</span>
              <span>g</span>
              <span>i</span>
              <span>n</span>
            </h1>
          }
          {
            loginErrors !== "Error:" || errors !== "" ?
            <h2>{loginErrors !== "Error:" ? loginErrors : errors}</h2> : ""
          }
          <div>
            {
              this.state.newUser &&
              <div>
                <input 
                  onBlur={this.blur}
                  onFocus={this.focus} 
                  type="text" 
                  id="name"
                  ref="name"
                  name='name'
                  value={name}
                  onChange={e => this.setState({name: e.target.value})} />
                <label htmlFor="name">Full Name</label>
              </div>
            }
            <div>
              <input 
                onBlur={this.blur}
                onFocus={this.focus} 
                type="email" 
                id="email"
                ref="email"
                name='email'
                value={email}
                onChange={e => this.setState({email: e.target.value})} />
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input 
                onBlur={this.blur}
                onFocus={this.focus} 
                type="password" 
                id="password"
                ref="password"
                name='password'
                value={password}
                onChange={e => this.setState({password: e.target.value})} />
              <label htmlFor="password">Password</label>
            </div>
            <button 
              onClick={this.submit}>
              Login
              <img src={CheckIcon} alt="logging in" />
            </button>
            {
              newUser ?
              <h2>Already have an account? <a onClick={this.isNewUser}>Login</a></h2>
              :
              <h2>Are you a new user? <a onClick={this.isNewUser}>Sign up</a></h2>
            }
          </div>
        </div>
      </section>
    );
  }
}

export default connect(null, { auth })(LandingPage);