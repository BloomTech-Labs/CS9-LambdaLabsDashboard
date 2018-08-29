import React, { Component } from "react";
import axios from "axios";
<<<<<<< HEAD
import "./editProject.css";
=======
import CreateStudent from "../CreateStudent/createStudent.js";
import { connect } from "react-redux";
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
<<<<<<< HEAD
      numberOfStudents: "",
=======
      githubHandle: "",
      trelloName: "",
      class: "",
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
      dueDate: ""
    };
  }

  createProjectHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitProject = () => {
    const object = {
      projectName: this.state.projectName,
<<<<<<< HEAD
      numberOfStudents: this.state.numberOfStudents,
=======
      githubHandle: this.state.githubHandle,
      class: this.state.class,
      trelloName: this.state.trelloName,
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
      dueDate: this.state.dueDate
    };
    const id = this.props.match.params.id;
    console.log(object);
    const promise = axios.put(`http://localhost:4000/projects/${id}`, object);
    promise
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
<<<<<<< HEAD
    console.log(this.props.match.params.id);
    return (
      <div className="createProject">
=======
    console.log("params.id ====> ", this.props.match.params.id);

    return (
      <div className="createProject">
        {}

>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
        <h1> Edit PROJECT</h1>
        <input
          type="text"
          placeholder="Project Name"
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
          onChange={this.createProjectHandler}
        />
        <input
          type="text"
          placeholder="class"
          name="class"
          value={this.state.class}
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
          onChange={this.createProjectHandler}
        />
        <input
          type="text"
<<<<<<< HEAD
          placeholder=" due Date "
=======
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
            this.submitProject();
            this.props.bill(this.state.githubHandle, this.state.trelloName);
            this.props.history.push("/projects");
          }}
        >
          {" "}
          Submit
        </button>
        <CreateStudent />
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
      </div>
    );
  }
}

<<<<<<< HEAD
export default EditProject;
=======
const mapStateToProps = state => {
  console.log("create  satate ===>", state.editProjectReducer);
  return {
    projectInfo: state.editProjectReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bill: (githubHandle, trelloName) => {
      dispatch({ type: "hilal", payload: { trelloName, githubHandle } });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProject);
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
