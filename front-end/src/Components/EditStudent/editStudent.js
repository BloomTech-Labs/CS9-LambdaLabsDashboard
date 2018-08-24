import React, { Component } from "react";
import axios from "axios";
import "./editStudent.css";

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
    const promise = axios.put(`http://localhost:4000/students/${id}`, object);
    promise
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

<<<<<<< HEAD
  render() {
    // console.log(this.props.match.params.id);
    return (
      <div className="editStudent">
=======
  gettingGithubHandles = () => {
    if (
      this.props.studentsGithub.length > 0 &&
      this.props.studentsGithub !== undefined &&
      this.props.studentsGithub !== null
    ) {
      const logins = this.props.studentsGithub.map(p => {
        return p.login;
      });
      return logins;
    }
  };

  filteringHandles = () => {
    let handlesArray = [];
    let handles = this.gettingGithubHandles();
    console.log("handles ===>:", handles);
    if (handles !== undefined && handles.length > 0) {
      for (let i = 0; i < handles.length; i++) {
        if (!handlesArray.includes(handles[i])) {
          handlesArray.push(handles[i]);
        }
      }
    }
    console.log("handlesarray==>", handlesArray);
    return handlesArray;
  };

  pullingGithubUsersRealInfo = () => {
    const dummyData = {};
  };

  render() {
    // const handles = this.filteringHandles();
    // const token = "47c075cdc8b2bd9d1c727790fc09558e85597179";

    // for (let i = 0; i < handles.length; i++) {
    //   const promise = axios.get(`https://api.github.com/users/${handles[i]}`, {
    //     headers: { Authorization: `bearer ${token}` }
    //   });

    //   promise.then(res => {
    //     console.log("res===> ", res.data);

    //     this.props.collectingData({
    //       FullName: res.data.name,
    //       githubHandle: res.data.login,
    //       githubURL: res.data.html_url,
    //       location: res.data.location
    //     });
    //   });
    // }

    return (
      <div className="editStudent">
        <div>
          <div>
            Full Name:
            {this.props.studentInfo.studentName}
          </div>
          <div>Trello: {this.props.studentInfo.trelloName}</div>

          <div>Github: xxxxx</div>
          <div>Email: xxxxx</div>
          <div>: xxxxx</div>
        </div>

>>>>>>> parent of 88a0e06a... ready but still not good in streaming data
        <h1> Edit Student</h1>
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
        <button
          onClick={() => {
            this.submitStudentChanges;
            this.props.history.push("/projects");
          }}
        >
          {" "}
          Submit
        </button>
      </div>
    );
  }
}

export default EditStudent;
