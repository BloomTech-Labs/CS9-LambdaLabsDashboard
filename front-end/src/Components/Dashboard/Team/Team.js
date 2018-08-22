import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamMember from './TeamMember/TeamMember';

class Team extends Component {  
  render = () => {
  	const { team } = this.props;
  	console.log(team);
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

const mSTP = ({ ExternalApis }) => {
	return { team: ExternalApis.team }; 
}

export default connect(mSTP)(Team);