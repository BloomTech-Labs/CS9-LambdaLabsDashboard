import React, { Component } from "react";
import axios from "axios";
import "./editProject.css";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      numberOfStudents: "",
      dueDate: ""
    };
  }

  createProjectHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitProject = () => {
    const object = {
      projectName: this.state.projectName,
      numberOfStudents: this.state.numberOfStudents,
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
    console.log(this.props.match.params.id);
    return (
      <div className="createProject">
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
          placeholder="Number of Student "
          name="numberOfStudents"
          value={this.state.numberOfStudents}
          onChange={this.createProjectHandler}
        />
        <input
          type="text"
          placeholder=" due Date "
          name="dueDate"
          value={this.state.dueDate}
          onChange={this.createProjectHandler}
        />
        <button onClick={this.submitProject}> Submit</button>
      </div>
    );
  }
}

export default EditProject;
