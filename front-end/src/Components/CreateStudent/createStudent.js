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
      github: ""
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
      trelloName: this.state.trelloName,
      salck: this.state.slack
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
        <h1> Add Student</h1>
        <input
          type="text"
          placeholder="first  Name"
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
          placeholder="slack name"
          name="slack"
          value={this.state.slack}
          onChange={this.editHandler}
        />

        <input
          type="text"
          placeholder="trelloName name"
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
          placeholder="github name"
          name="github"
          value={this.state.github}
          onChange={this.editHandler}
        />

        <button onClick={this.submitStudentChanges}> Submit</button>
      </div>
    );
  }
}

export default EditStudent;
