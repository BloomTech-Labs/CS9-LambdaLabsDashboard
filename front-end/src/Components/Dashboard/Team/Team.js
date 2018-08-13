import React, { Component } from 'react';

export default class Team extends Component {
  
  render = () => {
  	const { team } = this.props;
    return (
      <div className='team'>
      	<h2>Team:</h2>
      	<div>
	      	{
		        team.map((dude, i) => {
		          return (
		          	<div 
		          		key={`${dude}-${i}`}
		          		className='team-member'>
		          		<h3>{dude}</h3>
		          	</div>
		          );
		        })
		      }
	      </div>
      </div>
    );
  }
}