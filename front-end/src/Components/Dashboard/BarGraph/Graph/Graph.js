import React, { Component } from 'react';

export default class Graph extends Component {
  render = () => {
  	const { team } = this.props;
  	const { length } = team;
    return (
      <div className='graph-grid'>
      	{
      		team.map((dude, i) => {
      			console.log(100/length + '%')
      			return (
      				<div 
      					key={i}
	      				className='bar-container'
	      				style={{
	      					width: 100/length + '%'
	      				}}>
	      			</div>
      			);
      		})
      	}
      </div>
    );
  }
}