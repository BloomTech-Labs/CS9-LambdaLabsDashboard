import React, { Component } from "react";
import Sidenav from "../Sidenav/sidenav";
import axios from "axios";
import "./editStudent.css";

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      project: "",
      class: ""
    };
  }

  editHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitStudentChanges = () => {
    const object = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      project: this.state.project,
      class: this.state.class
    };
    const id = "";
    console.log(object);
    const promise = axios.put(`http://localhost:4000/students/${id}`, object);
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
        <Sidenav />
        <h1> Edit Student</h1>
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
          placeholder="project"
          name="project"
          value={this.state.project}
          onChange={this.editHandler}
        />

        <input
          type="text"
          placeholder="class"
          name="class"
          value={this.state.class}
          onChange={this.editHandler}
        />

        <button onClick={this.submitStudentChanges}> Submit</button>
      </div>
    );
  }
}

export default EditStudent;
