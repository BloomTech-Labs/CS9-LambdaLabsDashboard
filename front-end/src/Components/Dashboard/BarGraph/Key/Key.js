import React, { Component } from 'react';

export default class Key extends Component {

	shouldComponentUpdate = () => false;

  render = () => {
    return (
      <div className='graph-key'>
      	<div>
      		<div className='graph-indic'>
      			<div className='color'></div>
      			<h4>Trello</h4>
      		</div>
      		<div className='graph-indic'>
      			<div className='color'></div>
      			<h4>Github</h4>
      		</div>
      	</div>
      </div>
    );
  }
}