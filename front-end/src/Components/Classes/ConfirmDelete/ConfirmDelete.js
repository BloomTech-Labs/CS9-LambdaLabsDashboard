import React, { Component } from 'react';
import CheckIcon from '../../../pictures/check.svg';

export default class ConfirmDelete extends Component {
  render = () => {
  	const { classes, currentClass, closeConfirmDelete, deleteClass } = this.props;
    return (
      <div className={classes}>
      	<div>
      		<div>
	      		<h4>{`Are you sure you want to delete ${currentClass}?`}</h4>
	      		<div className='buttons'>
	      			<button onClick={closeConfirmDelete}>Cancel</button>
	      			<button onClick={deleteClass}>
                Yes
                <img src={CheckIcon} alt="delete class" />
              </button>
	      		</div>
	      	</div>
      	</div>
      </div>
    );
  }
}