import React, { Component } from "react";
import axios from "axios";
class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      githubURL: "",
      classId: "",
      trelloId: ""
    };
  }

  createProjectHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitProject = () => {
    const data = axios.get(
      "https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=all"
    );
    data.then(res => {
      console.log(res.data);
    });

    const object = {
      projectName: this.state.projectName,
      githubRepoName: this.state.githubRepoName,
      classId: this.state.classId,
      trelloId: this.state.trelloId
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
          placeholder=" projectName"
          name="projectName"
          value={this.state.projectName}
          onChange={this.createProjectHandler}
        />
        <input
          type="text"
          placeholder="Github repository"
          name="githubRepoName"
          value={this.state.githubRepoName}
          onChange={this.createProjectHandler}
        />

        <input
          type="text"
          placeholder=" trello ID"
          name="trelloId"
          value={this.state.trelloId}
          onChange={this.createProjectHandler}
        />
        <input
          type="text"
          placeholder=" class ID"
          name="classId"
          value={this.state.classId}
          onChange={this.createProjectHandler}
        />

        <button onClick={this.submitProject}> Submit</button>
      </div>
    );
  }
}

export default CreateProject;
