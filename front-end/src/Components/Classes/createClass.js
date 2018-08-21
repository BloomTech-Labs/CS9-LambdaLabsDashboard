import React, { Component } from "react";
import axios from "axios";
import "./editStudent.css";

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "",
      startDate: "",
      endDate: "",
      classId: ""
    };
  }

  editHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitStudentChanges = () => {
    const object = {
      className: this.state.className,
      classId: this.state.classId,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      projectsIds: this.state.projectsIds
    };
    const id = "";
    console.log(object);
    const promise = axios.post(`http://localhost:4000/classes`, object);
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
        <h1> Edit Student</h1>
        <input
          type="text"
          placeholder="class Name"
          name="className"
          value={this.state.className}
          onChange={this.editHandler}
        />

        <input
          type="text"
          placeholder="classId"
          name="classID"
          value={this.state.classId}
          onChange={this.editHandler}
        />
        <input
          type="text"
          placeholder="startDate"
          name="startDate"
          value={this.state.startDate}
          onChange={this.editHandler}
        />

        <input
          type="text"
          placeholder="endDate"
          name="endDate"
          value={this.state.endDate}
          onChange={this.editHandler}
        />
        <input
          type="text"
          placeholder="projects Ids"
          name="projectsIds"
          value={this.state.projectsIDs}
          onChange={this.editHandler}
        />

        <button onClick={this.submitStudentChanges}> Submit</button>
      </div>
    );
  }
}

export default EditStudent;
