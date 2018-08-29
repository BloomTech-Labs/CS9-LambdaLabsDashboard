import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TeamMember from './TeamMember/TeamMember';

class Team extends PureComponent {  
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

const mSTP = ({ ExternalApis }) => {
	return { team: ExternalApis.team }; 
}

export default connect(mSTP)(Team);