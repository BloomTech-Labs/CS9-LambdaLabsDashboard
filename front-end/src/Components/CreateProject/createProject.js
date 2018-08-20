import React, { Component } from "react";
import axios from "axios";
class CreateProject extends Component {
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
    return (
      <div className="createProject">
        <h1> Create PROJECTS</h1>
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

export default CreateProject;
