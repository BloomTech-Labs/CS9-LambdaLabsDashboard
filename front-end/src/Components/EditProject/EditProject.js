import React, { Component } from "react";
import axios from "axios";
import CreateStudent from "../CreateStudent/CreateStudent.js";
import { connect } from "react-redux";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      githubHandle: "",
      trelloName: "",
      class: "",
      dueDate: ""
    };
  }

  createProjectHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitProject = () => {
    const object = {
      projectName: this.state.projectName,
      githubHandle: this.state.githubHandle,
      class: this.state.class,
      trelloName: this.state.trelloName,
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
    console.log("params.id ====> ", this.props.match.params.id);

    return (
      <div className="createProject">
        {}

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
            this.props.history.push("/projects");
          }}
        >
          {" "}
          Submit
        </button>
        <CreateStudent />
      </div>
    );
  }
}

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
