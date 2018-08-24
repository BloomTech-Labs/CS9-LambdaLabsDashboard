import React, { Component } from "react";
import axios from "axios";
import "./editStudent.css";
import { connect } from "react-redux";
class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      slack: "",
      trelloName: "",
      email: "",
      github: "",
      dummyData: []
    };
  }

  componentWillMount() {
    this.pullingGithubUsersRealInfo();
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
    console.log("hilallllll====>");
    const handles = this.filteringHandles();
    const token = "443defdfb160d600093d598bd94798e4a66f6d19";
    for (let i = 0; i < handles.length; i++) {
      const promise = axios.get(`https://api.github.com/users/${handles[i]}`, {
        headers: { Authorization: `bearer ${token}` }
      });
      promise.then(res => {
        console.log("res===> ", res.data);
        this.props.collectingData({
          FullName: res.data.name,
          githubHandle: res.data.login,
          githubURL: res.data.html_url,
          location: res.data.location
        });
      });
    }
  };

  render() {
    console.log("githubDummyData", this.props.githubDummyData[0]);
    let student = "";
    if (this.props.githubDummyData.length > 0) {
      student = this.props.githubDummyData.filter(p => {
        console.log("p==>", p);
        return p.FullName === this.props.studentInfo.studentName;
      });
    }
    console.log("s==>", student);
    return (
      <div className="editStudent">
        <div className="studentIfo">
          <div>
            Full Name:
            {this.props.studentInfo.studentName}
          </div>
          <div>Trello: {this.props.studentInfo.trelloName}</div>

          <div>
            Github:
            {student[0] !== null &&
              student[0] !== undefined &&
              student[0].githubHandle}
          </div>
          <div>
            Email:{" "}
            {student[0] !== null &&
              student[0] !== undefined &&
              student[0].email}
          </div>
          <div>
            location:
            {student[0] !== null &&
              student[0] !== undefined &&
              student[0].location}
          </div>
        </div>

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

const mapStateToProps = state => {
  console.log("editstudent state ===> ", state.githubDummyDataReducer);
  let studentsGithub = "";
  if (state.studentInfoReducer.studentGithubInfo.githubUsers !== undefined) {
    studentsGithub = state.studentInfoReducer.studentGithubInfo.githubUsers;
  }
  return {
    studentInfo: state.studentInfoReducer.studentTrelloInfo,
    studentsGithub: studentsGithub,
    githubDummyData: state.githubDummyDataReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    collectingData: x => {
      dispatch({
        type: "gitthubDummyData",
        payload: x
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudent);
