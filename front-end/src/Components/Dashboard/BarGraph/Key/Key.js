import React, { Component } from 'react';

export default class Key extends Component {

	shouldComponentUpdate = () => false;

  render = () => {
    return (
      <div className='graph-key'>
      	<div>
    			<div className='color'>
            <h4>Trello</h4>
          </div>
    			<div className='color'>
            <h4>Github</h4>
          </div>
      	</div>
      </div>
    );
  }
}