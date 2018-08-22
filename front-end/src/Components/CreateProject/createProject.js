import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
// import Projects from "../Projects/projects.js";
export const TRELLONAME = "TRELLONAME";
export const GITHUBHANDLER = "GITHUBHANDLER";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      githubHandle: "",
      trelloName: "",
      class: "",
      dueDate: "",
      projects: ""
    };
  }

  createProjectHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitProject = Projects => {
    const object = {
      projectName: this.state.projectName,
      githubHandle: this.state.githubHandle,
      trelloName: this.state.trelloName,
      class: this.state.class,
      dueDate: this.state.dueDate
    };
    console.log(object);
    const promise = axios.post("http://localhost:4000/projects", object);
    return dispatch => {
      promise
        .then(response => {
          console.log("respose====>", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
  };

  render() {
    return (
      <div className="createProject">
        <h1> Create PROJECTS</h1>
        <input
          type="text"
          placeholder="ProjectName"
          name="projectName"
          value={this.state.projectName}
          onChange={this.createProjectHandler}
        />

        <input
          type="text"
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
          onChange={this.createProjectHandler}
        />
        <input
          type="text"
          placeholder="dueDate"
          name="dueDate"
          value={this.state.dueDate}
          onChange={this.createProjectHandler}
        />
        <button
          onClick={() => {
            this.submitProject();
            this.props.bill(this.state.githubHandle, this.state.trelloName);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("create  satate ===>", state);
  return {};
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
)(CreateProject);
