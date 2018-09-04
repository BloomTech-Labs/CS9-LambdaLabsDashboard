import React, { PureComponent } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Project from './Project/Project';
import Loader from '../Loader/Loader';
import ConfirmDelete from '../Classes/ConfirmDelete/ConfirmDelete';
import { generateColors } from '../../Helpers/Arrays';
import { updateClassPayload } from '../../Actions/Database'; 

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
      deleteClasses: 'class-delete',
      currentProject: '', 
      currentID: '',
    }
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    const { currentClass } = this.props;
    if(currentClass) this.setCurrentState(currentClass);
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
        console.log(res);
        if('error' in res.data) {
          this.setState({ studentLoader: false, loader: false, classes: 'projects projects-show' });
        } else {
          const { results: students } = res.data;
          this.setState({ students, studentLoader: false, loader: false, classes: 'projects projects-show' });
        }
      })
      .catch(err => this.setState({ students: [], studentLoader: false, loader: false, classes: 'projects projects-show' }));
  }

  openConfirmDelete = (name, id) => {
    this.setState({ 
      currentProject: name, 
      currentID: id,
      deleteClasses: 'class-delete class-modal-show'
    }, () => {
      setTimeout(() => {
        this.setState({
          deleteClasses: 'class-delete class-modal-show class-modal-enter'
        });
      }, 100);
    }); 
  }

  closeConfirmDelete = () => {
    this.setState({ 
      deleteClasses: 'class-delete class-modal-show class-modal-enter class-modal-close' }, () => {
      setTimeout(() => this.setState({ deleteClasses: 'class-delete'}), 500);
    })
  }

  deleteProject = () => {
    const { currentID } = this.state;
    const { userID } = this.props; 
    this.setState({
      deleteClasses: 'class-delete class-modal-show class-modal-enter class-modal-loading'
    }, () => {
      Axios.delete(`${baseURL}/projects/${currentID}/${userID}`)
        .then(res => this.UIAction('deleteClasses', res))
        .catch(err => this.closeConfirmDelete());
    });
  }

  UIAction = (el, res) => {
    setTimeout(() => {
      if(typeof res.data !== 'string') {
        this.setState({[el]: `${el === 'deleteClasses' ? 'class-delete' : 'class-create'} class-modal-show class-modal-enter class-modal-loading class-modal-complete`}, () => {
          this.props.updateClassPayload(res.data.classes)
          setTimeout(() => this.closeUIAction(el), 500);
        });
      } else {
        if(el === 'deleteClasses') this.closeUIAction(el);
        else this.setState({ createClasses: 'class-create class-modal-show class-modal-enter', newClassError: true });
      }
    }, 500);
  }

  closeUIAction = el => {
    if(el === 'deleteClasses') this.closeConfirmDelete();
    else this.closeCreateClass();
  }

  render = () => {
  	const { classes, projects, length, _id, students, loader, studentLoader, deleteClasses, currentProject } = this.state;
  	const { match, history } = this.props;
    const { className } = match.params;
    return (
      <div className={classes}>
        <ConfirmDelete
          classes={deleteClasses}
          currentClass={currentProject}
          closeConfirmDelete={this.closeConfirmDelete}
          deleteClass={this.deleteProject} />
        <button 
          onClick={() => history.push({ pathname: '/createProject', state: { classID: _id, className }})}
          className='create-project-button'>
            <div className='hor'></div>
            <div className='vert'></div>
          </button>
      	<div className='center'>
      		<h1>{className}</h1>
      		<div>
            {
              loader && <Loader dimensions={75} />
            }
      			{
              projects && projects.length > 0 && !loader ? 
      				projects.map((project, i) => {
      					const { name, github, trelloID, trelloURL, _id } = project;
                const { color1, color2 } = generateColors(i, length);
                const members = students.length > 0 ? students[i] : [];
      					return (
      						<Project 
      							key={`${name}-${i}`}
                    className={className}
      							index={i}
                    history={history}
                    color1={color1}
                    color2={color2}
      							name={name}
                    github={github}
                    trelloID={trelloID}
                    trelloURL={trelloURL}
      							students={members}
                    loader={studentLoader}
                    id={_id}
                    openConfirmDelete={this.openConfirmDelete} />
      					);
      				}) 
              : 
              !loader && <h2>{`Create a project to gain insites on ${className}'s progress`}</h2>
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

const mSTP = ({ Database, Navigation }, { match }) => {
  const { classes } = Database;
  const { userID } = Navigation
  return { currentClass: getClass(classes, match.params.className), userID };
}

export default connect(mSTP, { updateClassPayload })(Projects);
