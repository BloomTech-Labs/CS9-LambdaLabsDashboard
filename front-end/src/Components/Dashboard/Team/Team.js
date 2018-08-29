import React, { Component } from 'react';
import TeamMember from './TeamMember/TeamMember';

export default class Team extends Component {  
  render = () => {
  	const { team } = this.props;
    return (
      <div className='team'>
      	<h2>Team:</h2>
      	<div>
	      	{
		        team.map((dude, i) => {
		        	const { name, github } = dude;
		          return (
		          	<TeamMember
		          		key={`${dude}-${i}`}
		          		name={name}
		          		github={github} />
		          );
		        })
		      }
	      </div>
      </div>
    );
  }
}