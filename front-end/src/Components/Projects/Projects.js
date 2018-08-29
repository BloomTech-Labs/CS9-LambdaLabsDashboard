<<<<<<< HEAD
import React, { Component } from "react";
// import CreateProject from "../CreateProject/createProject.js";
import { Link } from "react-router-dom";
import axios from "axios";
import "./projects.css";
// import { Button } from "react-bootstrap";
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      students: [
        {
          name: "thomas",
          class: "cs9",
          participation: "80%",
          project: "dashboard"
        },
        {
          name: "bill",
          class: "cs9",
          participation: "80%",
          project: "dashboard"
        },
        {
          name: "steve",
          class: "cs9",
          participation: "80%",
          project: "dashboard"
        },
        {
          name: "kyle",
          class: "cs9",
          participation: "80%",
          project: "dashboard"
        },
        {
          name: "zola",
          class: "cs9",
          participation: "80%",
          project: "dashboard"
        }
      ]
    };
  }
  componentWillMount() {
    this.fetchingData();
  }
  fetchingData = () => {
    const promise = axios.get("http://localhost:4000/projects");
    promise
      .then(response => {
        console.log(response.data);
        this.setState({ projects: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  deleteProject = id => {
    const promise = axios.delete(`http://localhost:4000/projects/${id}`);
    promise
      .then(response => {
        console.log(response.data);
        this.fetchingData();
      })
      .catch(error => {
        console.log(error);
      });
  };
  displayProjects() {
    let data = this.state.projects.projects;
    if (data === undefined) {
      return <div>loading projects</div>;
    } else {
      return this.state.projects.projects.map(project => {
        console.log(project._id);
        return (
          <div key={project._id} className="projectCard">
            <div>
              <span>Project:</span> {project.projectName}
            </div>
            <div>
              <span>Total Students:</span>
              {project.numberOfStudents}
            </div>
            <div>
              <span>DueDate: </span>
              {project.dueDate}
            </div>
            <div className="students">
              {this.state.students.map(student => {
                console.log("student", student);
                return (
                  <div key={student.name} className="student">
                    <div>
                      <Link to="/projects/EditStudent">
                        <span>Student:</span>
                        {student.name}
                      </Link>
                    </div>
                    <div>
                      <span>Participation:</span>
                      {student.participation}
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to={`projects/EditProject/${project._id}`}>
              <button className="editButton">Edit</button>
            </Link>
            <Link to="#">
              <button className="dashBoardButton">Dashboard</button>
            </Link>
            <button
              onClick={() => {
                alert("hello");
                console.log("project=>", project._id);
                this.deleteProject(project._id);
              }}
            >
              Delete Project
            </button>
          </div>
        );
      });
    }
  }
  signout =()=>{
    localStorage.removeItem('token')
    this.props.history.push('/SignIn')
}
  render() {
    console.log("state", this.state.projects.projects);
    console.log(this.props);
    return (
      <div className="projects">
        <h1>
          <span>Projects</span>
        </h1>
        <div className="allCards">{this.displayProjects()}</div>
        <Link to="/createProject">
          <div className="newProjectCard">
          

            <span> New Project</span>
            <img src={require("../../pictures/add.png")} width="100px" alt='add' />
          </div>
        </Link>
=======
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
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
      </div>
    );
  }
}
<<<<<<< HEAD
export default Projects;
=======
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
