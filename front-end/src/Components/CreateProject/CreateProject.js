import React, { Component } from "react";
import axios from "axios";
<<<<<<< HEAD
=======
import { connect } from "react-redux";
// import Projects from "../Projects/projects.js";
// import submitProject from "../../Reducers/submitProject.js";
export const TRELLONAME = "TRELLONAME";
export const GITHUBHANDLER = "GITHUBHANDLER";

>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
<<<<<<< HEAD
      numberOfStudents: "",
      dueDate: ""
=======
      githubHandle: "",
      trelloName: "",
      class: "",
      dueDate: "",
      projectId: ""
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
    };
  }

  createProjectHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

<<<<<<< HEAD
  submitProject = () => {
    const object = {
      projectName: this.state.projectName,
      numberOfStudents: this.state.numberOfStudents,
      dueDate: this.state.dueDate
    };
    console.log(object);
    const promise = axios.post("http://localhost:4000/projects", object);
    promise
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
=======
  // submitProject = dispatch => {
  //   const object = {
  //     projectName: this.state.projectName,
  //     githubHandle: this.state.githubHandle,
  //     trelloName: this.state.trelloName,
  //     class: this.state.class,
  //     dueDate: this.state.dueDate
  //   };
  //   console.log(object);
  //   const promise = axios.post("http://localhost:4000/projects", object);
  //   return dispatch => {
  //     promise
  //       .then(response => {
  //         dispatch({
  //           type: "projectId",
  //           payload: response.data
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   };
  // };

  render() {
    console.log("props ====>", this.props);
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
    return (
      <div className="createProject">
        <h1> Create PROJECTS</h1>
        <input
          type="text"
<<<<<<< HEAD
          placeholder="Project Name"
=======
          placeholder="ProjectName"
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
          name="projectName"
          value={this.state.projectName}
          onChange={this.createProjectHandler}
        />

        <input
          type="text"
<<<<<<< HEAD
          placeholder="Number of Student "
          name="numberOfStudents"
          value={this.state.numberOfStudents}
=======
          placeholder="githubHandle "
          name="githubHandle"
          value={this.state.githubHandle}
          onChange={this.createProjectHandler}
        />
        <input
          type="text"
          placeholder="trelloName "
          name="trelloName"
          value={this.state.trelloName}
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
          onChange={this.createProjectHandler}
        />
        <input
          type="text"
<<<<<<< HEAD
          placeholder=" due Date "
=======
          placeholder="class"
          name="class"
          value={this.state.class}
          onChange={this.createProjectHandler}
        />
        <input
          type="text"
          placeholder="dueDate"
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
          name="dueDate"
          value={this.state.dueDate}
          onChange={this.createProjectHandler}
        />
<<<<<<< HEAD
        <button onClick={this.submitProject}> Submit</button>
=======
        <button
          onClick={() => {
            this.props.submitProject(
              this.state.projectName,
              this.state.githubHandle,
              this.state.trelloName,
              this.state.class,
              this.state.dueDate
            );
            this.props.bill(this.state.githubHandle, this.state.trelloName);
          }}
        >
          Submit
        </button>
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
      </div>
    );
  }
}

<<<<<<< HEAD
export default CreateProject;
=======
const mapStateToProps = state => {
  console.log("create  satate ===>", state);
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    bill: (githubHandle, trelloName) => {
      dispatch({ type: "hilal", payload: { trelloName, githubHandle } });
    },
    submitProject: (projectName, githubHandle, trelloName, Class, dueDate) => {
      const object = {
        projectName: projectName,
        githubHandle: githubHandle,
        trelloName: trelloName,
        class: Class,
        dueDate: dueDate
      };
      console.log(object);
      dispatch({ type: "try" });
      const promise = axios.post("http://localhost:4000/projects", object);
      promise
        .then(response => {
          dispatch({
            type: "projectId",
            payload: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
