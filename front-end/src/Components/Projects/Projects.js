import React, { Component } from 'react';
import Project from './Project/Project';
import { generateColors } from '../../Helpers/Arrays';

export default class projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	classes: 'projects',
    	projects: [
    		{
    			name: 'Labs Dashboard',
    			students: [
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    			]
    		},
    		{
    			name: 'Labs Dashboard',
    			students: [
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    			]
    		},
    		{
    			name: 'Labs Dashboard',
    			students: [
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    			]
    		},
    		{
    			name: 'Labs Dashboard',
    			students: [
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    			]
    		},
    		{
    			name: 'Labs Dashboard',
    			students: [
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    			]
    		},
    		{
    			name: 'Labs Dashboard',
    			students: [
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    			]
    		},
    		{
    			name: 'Labs Dashboard',
    			students: [
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    				'Alex Figliolia',
    			]
    		},
    	]
    }
  }

  componentDidMount = () => setTimeout(this.enter, 500);

  enter = () => this.setState({ classes: 'projects projects-show' });

  render = () => {
  	const { classes, projects } = this.state;
  	const { className, history } = this.props;
    const { length } = projects;
    return (
      <div className={classes}>
        <button 
          onClick={() => history.push('/createProject')}
          className='create-project-button'></button>
      	<div>
      		<h1>{className ? className : 'CS9'}</h1>
      		<div>
      			{
      				projects.map((project, i) => {
      					const { name, students } = project;
                const { color1, color2 } = generateColors(i, length);
      					return (
      						<Project 
      							key={name}
      							index={i}
                    color1={color1}
                    color2={color2}
      							name={name}
      							students={students} />
      					);
      				})
      			}
      		</div>
      	</div>
      </div>
    );
  }
}
