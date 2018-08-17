import React, { Component } from 'react';
import teamMember from './TeamMember/teamMember';

export default class Team extends Component {

	componentDidMount = () => {
		if(window.innerWidth >= 670) {
			this.props.setHeight(this.refs.teamContainer.clientHeight);
		}
		window.addEventListener('resize', this.resize, true);
	}

	componentWillUnmount = () => {
    window.removeEventListener('resize', this.resize, true);
  }

  resize = e => {
  	const { boxHeight, setHeight } = this.props;
  	const width = window.innerWidth;
  	if(width >= 670 && boxHeight === null) {
			setHeight(this.refs.teamContainer.clientHeight);
  	} else if(width < 670 && boxHeight !== null) {
  		setHeight(null);
  	}
  }
  
  render = () => {
  	const { team } = this.props;
    return (
      <div className='team' ref='teamContainer'>
      	<h2>Team:</h2>
      	<div>
	      	{
		        team.map((dude, i) => {
		        	const { name, github } = dude;
		          return (
		          	<teamMember
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