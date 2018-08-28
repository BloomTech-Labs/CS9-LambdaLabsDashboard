import React, { Component } from 'react';

export default class ConfirmDelete extends Component {
  render = () => {
  	const { classes, currentClass, closeConfirmDelete, deleteClass } = this.props;
    return (
      <div className={classes}>
      	<div>
      		<div>
	      		<h4>{`Are you sure you want to delete ${currentClass}`}</h4>
	      		<div className='buttons'>
	      			<button onClick={closeConfirmDelete}>Cancel</button>
	      			<button onClick={deleteClass}>Yes</button>
	      		</div>
	      	</div>
      	</div>
      </div>
    );
  }
}