import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
// import Projects from "../Projects/projects.js";
// import submitProject from "../../Reducers/submitProject.js";
import "./createProject.css";
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
      projectId: "",
      clicked: false
    };
  }

  createProjectHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    if (this.clicked === true) {
      if (
        (this.state.projectName !== "",
        this.state.githubHandle !== "",
        this.state.trelloName !== "")
      ) {
        this.props.submitProject();
      }
    }
  }

  render() {
    console.log("props ====>", this.props);
    return (
      <div className="createProject">
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
          placeholder="trellId"
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
          className="createButton"
          onClick={() => {
            this.setState({ clicked: true });
            this.props.submitProject(
              this.state.projectName,
              this.state.githubHandle,
              this.state.trelloName,
              this.state.class,
              this.state.dueDate
            );
            this.props.bill(this.state.githubHandle, this.state.trelloName);

            setTimeout(() => this.props.history.push("./projects"), 1000);
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
      dispatch({ type: "NEWPROJECT", payload: "" });
      const promise = axios.post("http://localhost:4000/projects", object);
      promise
        .then(response => {
          console.log("createProjectResponce ====>", response);

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
