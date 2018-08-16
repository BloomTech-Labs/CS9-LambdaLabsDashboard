import React, { Component } from 'react';
import UserIcon from './user.svg';
import GithubIcon from './github.svg';
export default class TeamMember extends Component {
  

  render = () => {
  	const { name, github } = this.props;
    return (
      <div className='team-member'>
      	<img alt="user-icon" src={UserIcon} />
	  		<div className='user-info'>
	  			<h3>{name}</h3>
	  			<div 
            className='github'
            onClick={() => window.open(`https://github.com/${github}`, "_blank")}>
	  				<img alt="user-icon" src={GithubIcon} />
		  			<h4>{github}</h4>
		  		</div>
	  		</div>
	  	</div>
    );
  }
}