import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Input from '../Input/Input';
import Check from '../../pictures/check.svg';
import { updateClassPayload } from '../../Actions/Database'; 

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	name: '',
      repository: '',
      trello: '',
      classes: 'submit-project',
      error: false,
      errorMessage: ''
    }
  }

  componentDidMount = () => {
    const { history, location } = this.props;
    const { state } = location;
    if(!state) {
      history.push('/classes');
    } else {
      window.scrollTo(0, 0);
      if('edit' in state) {
        const { github, trelloURL, name } = state;
        this.setState({ name, trello: trelloURL, repository: github });
      }
    }
  }

  shouldComponentUpdate = (nextProps, {className, name, repository, trello, classes, error}) => {
  	const curState = this.state;
  	if(className !== curState.className) return true;
  	else if(name !== curState.name) return true;
  	else if(repository !== curState.repository) return true;
  	else if(trello !== curState.trello) return true;
  	else if(classes !== curState.classes) return true;
  	else if(error !== curState.error) return true;
  	return false;
  }

  inputChange = (name, value) => {
  	this.setState({[name]: value });
  }

  checkState = () => {
  	const { name, repository, trello } = this.state;
    const { edit, classID, className } = this.props.location.state;
    if(edit) return className !== '' && name !== '' && repository !== '' && trello !== '';
  	return className !== '' &&
  				 name !== '' &&
  				 repository !== '' &&
  				 trello !== '' &&
           classID;
  }

  error = (msg='') => {
  	this.setState({ classes: 'submit-project', error: true, errorMessage: msg });
  }

  submit = () => {
  	this.setState({ classes: 'submit-project submit-project-loading' }, () => {
  		const { name, repository, trello } = this.state;
      const { location, match, userID } = this.props;
      const { classID, className } = location.state;
	  	if(this.checkState()) {
        if('edit' in location.state) {
          Axios.put(`${baseURL}/projects/${match.params.id}/${userID}`, { classID, name, github: repository, trello })
            .then(res => this.rehydrateClasses(res, className))
            .catch(err => this.error());
        } else {
          Axios.post(`${baseURL}/projects`, { classID, name, github: repository, trello })
            .then(res => this.rehydrateClasses(res, className))
            .catch(err => this.error());
        }
		  } else {
		  	this.error();
		  }
  	});
  }

  rehydrateClasses = (res, className) => {
    const { data } = res;
    const { history, updateClassPayload } = this.props;
    if(typeof data === 'string') {
      if(data === 'Incorrect Trello link') this.error(data);
      else this.error();
    } else {
      updateClassPayload(data.classes);
      this.setState({ classes: 'submit-project submit-project-loading submit-project-complete'}, () => {
        setTimeout(() => 
          this.setState({ classes: 'submit-project' }, () => {
            setTimeout(() => history.push(`/projects/${className}`), 400);
          })
        , 1000);
      });
    }
  }

  render = () => {
  	const { name, repository, trello, classes, error, errorMessage } = this.state;
    const { location } = this.props;
    return (
      <div 
        ref="container"
        className="create-project">
        <div className='center'>
          <div className='title'>
          	<h1>
              {
                location.state && 'edit' in location.state ? 
                `Editing ${name}`
                :
                'Please answer a few questions about your project'
              } 
            </h1>
          </div>
          <div className="questionaire">
          	<h2 data-num="1">Classification</h2>
          	<Input 
            	labelText='1) What is the name of this product?'
            	type='text'
            	placeholder='Ex: Project Manager'
            	name='name'
            	value={name}
            	onChange={this.inputChange} />
            <h2 data-num="2">Linked Accounts</h2>
            <Input 
            	labelText='1) What is the name of your github repository?'
            	type='text'
            	placeholder='Ex: My-Repository'
            	name='repository'
            	value={repository}
            	onChange={this.inputChange} />
            <Input 
            	labelText='2) Please provide the link to your trello board'
            	type='text'
            	placeholder='Ex: https://trello.com/...'
            	name='trello'
            	value={trello}
            	onChange={this.inputChange} />
            {
              error && 
                <h2 data-num="X">{
                  errorMessage === '' ? 'Please check your inputs and try again' : errorMessage
                }</h2>
            }
            <button 
              className={classes} 
              onClick={this.submit}>
                Submit
                <img src={Check} alt="Configure new project" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mSTP = ({ Navigation }) => {
  return { userID: Navigation.userID }; 
}

export default connect(mSTP, { updateClassPayload })(CreateProject);

