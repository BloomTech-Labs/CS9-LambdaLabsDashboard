import React, { Component } from 'react';
import { connect } from 'react-redux';
import Project from './Project/Project';
import { generateColors } from '../../Helpers/Arrays';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	classes: 'projects',
    }
  }

  componentDidMount = () => setTimeout(this.enter, 500);

  enter = () => this.setState({ classes: 'projects projects-show' });

  getLength = currentClass => {
    console.log(currentClass);
    if(currentClass && 'projects' in currentClass) {
      const { projects, _id } = currentClass;
      return { projects, length: projects.length, _id };
    }
    return { projects: [], length: 0, _id: null };
  }

  render = () => {
  	const { classes } = this.state;
  	const { match, history, currentClass } = this.props;
    const { className } = match.params;
    console.log(currentClass);
    const { projects, length, _id } = this.getLength(currentClass);
    return (
      <div className={classes}>
        <button 
          onClick={() => history.push({ pathname: '/createProject', state: { classID: _id, className }})}
          className='create-project-button'></button>
      	<div>
      		<h1>{className}</h1>
      		<div>
      			{
              projects &&
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
      							students={students ? students : []} />
      					);
      				})
      			}
      		</div>
      	</div>
      </div>
    );
  }
}

const getClass = (classes, cn) => {
  let c;
  for(let i = 0; i < classes.length; i++) {
    const { className } = classes[i];
    if(cn === className) {
      c = classes[i];
      break;
    }
  }
  return c;
}

const mSTP = ({ Database }, { match }) => {
  const { classes } = Database;
  return { currentClass: getClass(classes, match.params.className )};
}

export default connect(mSTP)(Projects);
