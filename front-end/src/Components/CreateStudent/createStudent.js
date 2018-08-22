import React, { Component } from "react";
import axios from "axios";

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      slack: "",
      trelloName: "",
      email: "",
      githubHandle: ""
    };
  }

  editHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitStudentChanges = () => {
    const object = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      github: this.state.github,
      projectId: this.state.projectId,
      classId: this.state.classId
    };
    const id = "";
    console.log(object);
    const promise = axios.post(`http://localhost:4000/students`, object);
    promise
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    // console.log(this.props.match.params.id);
    return (
      <div className="editStudent">
        <h1> Create Student</h1>
        <input
          type="text"
          placeholder="student Name"
          name="firstName"
          value={this.state.firstName}
          onChange={this.editHandler}
        />

        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={this.state.lastName}
          onChange={this.editHandler}
        />
        <input
          type="text"
          placeholder="slack"
          name="slack"
          value={this.state.slack}
          onChange={this.editHandler}
        />

        <input
          type="text"
          placeholder="trelloName"
          name="trelloName"
          value={this.state.trelloName}
          onChange={this.editHandler}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          value={this.state.email}
          onChange={this.editHandler}
        />
        <input
          type="text"
          placeholder="github"
          name="github"
          value={this.state.githubHandle}
          onChange={this.editHandlerHandle}
        />

        <button onClick={this.submitStudentChanges}> Submit</button>
      </div>
    );
  }
}

export default EditStudent;
