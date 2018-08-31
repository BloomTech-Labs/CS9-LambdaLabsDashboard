import React, { PureComponent } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Input from '../../Input/Input';
import ClassProject from './ClassProject/ClassProject';
import { updateClassPayload } from '../../../Actions/Database';
import CheckIcon from '../../../pictures/check.svg';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

class Class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      classes: 'class',
      trans: true,
      newName: '',
      error: false,
    };
  }

  flip = () => {
    this.setState(ps => {
      return {
        trans: false,
        classes: ps.classes === 'class' ? 'class class-flip' : 'class'
      }
    })
  }

  inputChange = (name, value) => {
    this.setState({ newName: value });
  }

  navigate = (name, github, trello, history) => {
    history.push(`/project/${trello}/${github}/${name}`);
  }

  changeName = () => {
    const { newName } = this.state;
    const { _id, userID, updateClassPayload } = this.props;
    if(newName.length > 2) {
      this.setState({ classes: 'class class-flip class-loading' }, () => {
        Axios.put(`${baseURL}/classes/${userID}/${_id}`, { className: newName })
          .then(res => {
            if(typeof res === 'string') {
              this.setState({ error: true });
            } else {
              updateClassPayload(res.data.classes);
              setTimeout(() => {
                this.setState({ classes: 'class class-flip class-loading class-complete', newName: ''}, () => {
                  setTimeout(() => {
                    this.setState({ classes: 'class' });
                  })
                })
              }, 500);
            }
          })
          .catch(err => {
            this.setState({ error: true });
          })
      })
    }
  }

  render = () => {
    const { classes, trans, newName, error } = this.state;
  	const { index, name, projects, _id, openConfirmDelete, color1, color2, history } = this.props;
    const { length } = projects;
    return (
      <div 
        className={classes}
        style={{transitionDelay: trans ? `${index*70}ms` : '0s'}} >
      	<div className='front'>
          <div 
            className='top-border'
            style={{
              background: `linear-gradient(to right, ${color1}, ${color2})`
            }} />
          <div>
            <h2 onClick={() => history.push(`/projects/${name}`)}>{name}</h2>
            {
              length > 0 ?
              projects.map((project, i) => {
                return (
                  <ClassProject 
                    key={i}
                    index={i}
                    {...project}
                    history={history}
                    length={length} />
                );
              })
              : <p>{`There are no projects in ${name}`}</p>
            }
          </div>
          <button 
            onClick={this.flip}
            className='edit'></button>
          <button
            onClick={() => openConfirmDelete(name, _id)} 
            className='delete'></button>
        </div>
        <div className='back'>
          <div>
            <div 
              className='top-border'
              style={{
                background: `linear-gradient(to right, ${color1}, ${color2})`
              }} />
            <button
              className='reverse' 
              onClick={this.flip}></button>
            <h3>{error ? 'Please try again' : `Update ${name}`}</h3>
            <Input 
              labelText=''
              type='text'
              placeholder='Class Name:'
              name='newName'
              value={newName}
              onChange={this.inputChange} />
            <button 
              onClick={this.changeName}
              className='submit'>
              Update
              <img src={CheckIcon} alt="update class name" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateClassPayload })(Class);