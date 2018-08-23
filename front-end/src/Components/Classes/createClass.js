import React, { Component } from "react";
import axios from "axios";

class CreateClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "",
      startDate: "",
      endDate: "",
      classId: ""
    };
    this.trelloKey = "cb548cca4f1358b69b3bee4a25ca02ec";
    this.trelloToken =
      "5b6ec3db4fe7211b52293adec51fefdd06444a2546ff8ca725dbc5c5ebefa114";
    this.auth = `?key=${this.trelloKey}&token=${this.trelloToken}`;
  }

  editHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitStudentChanges = () => {
    // .catch(err => this.setState({ error: true }));

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

    const members = axios.get(
      `https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/members${
        this.auth
      }`
    );
    members.then(res => {
      console.log("members ====>", res);
    });

    const cards = axios.get(
      `https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/cards${
        this.auth
      }`
    );
    cards.then(res => {
      console.log("cards ====>", res);
    });

    const lists = axios.get(
      `https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/lists${
        this.auth
      }`
    );

    lists.then(res => {
      console.log("lists ====>", res);
    });

    const gitPulls = axios.get(
      "https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=all"
    );

    gitPulls.then(res => {
      console.log("pulls ====>", res);
    });

    return (
      <div className="editStudent">
        <h1> Create Class </h1>
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

export default CreateClass;
