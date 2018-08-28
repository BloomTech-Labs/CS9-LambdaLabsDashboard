import React, { Component } from 'react';

export default class Class extends Component {
  render = () => {
  	const { name, projects, _id, openConfirmDelete } = this.props;
    return (
      <div className='class'>
      	<div>
      		<h2>{name}</h2>
      		{
      			projects.map(project => {
      				return (
      					<div key={project}>{project}</div>
      				);
      			})
      		}
      	</div>
        <button className='edit'></button>
        <button
          onClick={() => openConfirmDelete(name, _id)} 
          className='delete'></button>
      </div>
    );
  }
}