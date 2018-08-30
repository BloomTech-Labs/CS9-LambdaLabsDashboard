import React, { PureComponent } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Project from './Project/Project';
import Loader from '../Loader/Loader';
import { generateColors } from '../../Helpers/Arrays';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

class Projects extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    	classes: 'projects',
      projects: [],
      students: [],
      length: 0, 
      _id: null, 
      loader: true,
      studentLoader: true,
    }
  }

  componentDidMount() {
    const { currentClass } = this.props;
    if(currentClass) this.setCurrentState(currentClass);
    // setTimeout(this.enter, 500);
  }

  UNSAFE_componentWillReceiveProps = ({ currentClass, match }) => {
    if(currentClass && !this.props.currentClass) {
      this.setCurrentState(currentClass);
    } else if(currentClass && currentClass.projects.length !== this.props.currentClass.projects.length) {
      this.setCurrentState(currentClass);
    }
    if(match.params.className !== this.props.match.params.className) this.reset(currentClass);
  }

  reset = currentClass => {
    this.setState({ classes: 'projects', loader: true, studentLoader: true, projects: [], students: [], length: 0 }, () => {
      if(currentClass) this.setCurrentState(currentClass);
    });
  }

  // enter = () => this.setState({ classes: 'projects projects-show' });

  setCurrentState = currentClass => {
    const { projects, length, _id } = this.getLength(currentClass);
    this.getStudents(currentClass._id);
    this.setState({ projects, length, _id });
  }

  getLength = currentClass => {
    if(currentClass && 'projects' in currentClass) {
      const { projects, _id } = currentClass;
      return { projects, length: projects.length, _id };
    }
    return { projects: [], length: 0, _id: null };
  }

  getStudents = id => {
    Axios.get(`${baseURL}/classes/projects/${id}`)
      .then(res => {
        const { results: students } = res.data;
        this.setState({ students, studentLoader: false, loader: false, classes: 'projects projects-show' });
      })
      .catch(err => this.setState({ students: [], studentLoader: false, loader: false, classes: 'projects projects-show' }));
  }

  render = () => {
  	const { classes, projects, length, _id, students, loader, studentLoader } = this.state;
  	const { match, history } = this.props;
    const { className } = match.params;
    return (
      <div className={classes}>
        <button 
          onClick={() => history.push({ pathname: '/createProject', state: { classID: _id, className }})}
          className='create-project-button'></button>
      	<div>
      		<h1>{className}</h1>
      		<div>
            {
              loader && <Loader dimensions={75} />
            }
      			{
              projects && projects.length > 0 && !loader ? 
      				projects.map((project, i) => {
      					const { name, github, trello } = project;
                const { color1, color2 } = generateColors(i, length);
                const members = students.length > 0 ? students[i] : [];
      					return (
      						<Project 
      							key={`${name}-${i}`}
      							index={i}
                    history={history}
                    color1={color1}
                    color2={color2}
      							name={name}
                    github={github}
                    trello={trello}
      							students={members}
                    loader={studentLoader} />
      					);
      				}) 
              : 
              <h2>{`Create a project to gain insites on ${className}'s progress`}</h2>
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
