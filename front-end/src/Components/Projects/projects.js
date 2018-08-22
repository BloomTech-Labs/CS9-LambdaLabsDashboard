import React, { Component } from "react";
import { connect } from "react-redux";
// import CreateProject from "../CreateProject/createProject.js";
import { Link } from "react-router-dom";
import axios from "axios";
import "./projects.css";
// import { Button } from "react-bootstrap";
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      students: [],
      pullRequests: [],
      trelloCards: [],
      trelloList: []
    };
    this.trelloKey = "cb548cca4f1358b69b3bee4a25ca02ec";
    this.trelloToken =
      "5b6ec3db4fe7211b52293adec51fefdd06444a2546ff8ca725dbc5c5ebefa114";
    this.auth = `?key=${this.trelloKey}&token=${this.trelloToken}`;
  }

  componentWillMount() {
    if (this.props.logins[0] !== undefined) {
      this.fetchingMembersFromTrello(this.props.logins[0].trelloName);
      this.fetchingPullsFromGithub(this.props.logins[0].githubHandle);
      this.fetchingCardsFromTrello(this.props.logins[0].trelloName);
      this.fetchingListsFromTrello(this.props.logins[0].trelloName);
    }
  }
  componentDidMount() {
    this.fetchingData();
  }

  fetchingCardsFromTrello(x) {
    console.log("x===>", x);
    if (x === undefined || x === null) {
      return;
    }
    const cards = axios.get(
      `https://api.trello.com/1/boards/${x}/cards${this.auth}`
    );
    cards
      .then(res => {
        console.log("cards ====>", res);
        if (res.data !== undefined || res.data !== undefined) {
          this.setState({ trelloCards: res.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  fetchingListsFromTrello(x) {
    if (x === undefined || x === null) {
      return;
    }
    const lists = axios.get(
      `https://api.trello.com/1/boards/${x}/lists${this.auth}`
    );

    lists
      .then(res => {
        console.log("lists ====>", res);
        if (res.data !== undefined || res.data !== undefined) {
          this.setState({ trelloList: res.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  fetchingPullsFromGithub(x) {
    console.log("x3===>", x);
    if (x === undefined || x === null) {
      return;
    }
    const gitPulls = axios.get(
      `https://api.github.com/repos/Lambda-School-Labs/${x}/pulls?state=all`
    );

    gitPulls
      .then(res => {
        console.log("pulls ====>", res.data);
        if (res.data !== undefined || res.data !== undefined) {
          this.setState({ pullRequests: res.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchingMembersFromTrello(x) {
    console.log("x2===>", x);
    if (x === undefined || x === null) {
      return;
    }
    const members = axios.get(
      `https://api.trello.com/1/boards/${x}/members${this.auth}`
    );
    members
      .then(res => {
        console.log("members ====>", res.data);
        if (res.data !== undefined || res.data !== undefined) {
          this.setState({ students: res.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchingData = () => {
    console.log("alex ====> ....");
    const promise = axios.get("http://localhost:4000/projects");
    promise
      .then(response => {
        console.log(response.data);
        this.setState({ projects: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  deleteProject = id => {
    const promise = axios.delete(`http://localhost:4000/projects/${id}`);

    promise
      .then(response => {
        console.log(response.data);
        this.fetchingData();
      })
      .catch(error => {
        console.log(error);
      });
  };
  displayProjects() {
    let data = this.state.projects.projects;
    if (data === undefined) {
      return <div>loading projects</div>;
    } else {
      return this.state.projects.projects.map(project => {
        console.log(project._id);
        return (
          <div key={project._id} className="projectCard">
            <div>
              <span>Project:</span> {project.projectName}
            </div>
            <div>
              <span>Total Students:</span>
              {this.state.students.length}
            </div>
            <div>
              <span>DueDate: </span>
              {project.dueDate}
            </div>
            <div className="students">
              {this.state.students.map(student => {
                console.log("student===>", student);
                return (
                  <div key={student.fullName} className="student">
                    <div>
                      <Link to="/projects/EditStudent">
                        <span>Student:</span>
                        {student.fullName}
                      </Link>
                    </div>
                    <div>
                      <span>Participation:</span>
                      {student.participation}
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to={`projects/EditProject/${project._id}`}>
              <button className="editButton">Edit</button>
            </Link>
            <Link to="#">
              <button className="dashBoardButton">Dashboard</button>
            </Link>
            <button
              onClick={() => {
                alert("hello");
                console.log("project=>", project._id);
                this.deleteProject(project._id);
              }}
            >
              Delete Project
            </button>
          </div>
        );
      });
    }
  }
  render() {
    console.log(" projects props ===>", this.props.logins[0]);

    return (
      <div className="projects">
        <h1>
          <span>Projects</span>
        </h1>
        <div className="allCards">{this.displayProjects()}</div>
        <Link to="/createProject">
          <div className="newProjectCard">
            <span> New Project</span>
            <img src={require("../../pictures/add.png")} width="100px" />
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("projects satate ===>", state.trelloGithubReducer);
  return { logins: state.trelloGithubReducer };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
