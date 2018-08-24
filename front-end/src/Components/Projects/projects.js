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
      backupStudents: [],
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
  // shouldComponentUpdate() {
  //   this.fetchingMembersFromTrello();
  // }
  componentDidMount() {
    // if (this.props.logins[0] !== undefined) {
    //   this.fetchingMembersFromTrello(this.props.logins[0].trelloName);
    //   this.fetchingPullsFromGithub(this.props.logins[0].githubHandle);
    //   this.fetchingCardsFromTrello(this.props.logins[0].trelloName);
    //   this.fetchingListsFromTrello(this.props.logins[0].trelloName);
    // }
    this.fetchingData();
    // this.savingStudentsInDB();
    // this.fetchingStudentsFromDataBase();
  }
  // shouldComponentUpdate({}){

  // }

  fetchingCardsFromTrello(x) {
    // console.log("x===>", x);
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
    // console.log("x3===>", x);
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
    // console.log("x2===>", x);
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
  savingStudentsInDB = () => {
    const object = {};
    const arr = [];

    if (this.state.students.length > 0) {
      this.state.students.map(student => {
        arr.push(student.fullName);
      });

      object.users = arr;
      object.projectId = this.props.projectId.projectId;
      console.log(object);
      const promise = axios.post("http://localhost:4000/projectUsers", object);
      promise
        .then(res => {
          console.log("res===>", res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  fetchingStudentsFromDataBase = () => {
    const promise = axios.get(
      `http://localhost:4000/projectUsers/${this.props.projectId.projectId}`
    );
    promise
      .then(res => {
        console.log("res students ===>", res.data.users);
        this.setState({ backupStudents: res.data.users });
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchingData = () => {
    // console.log("alex ====> ....");
    const promise = axios.get("http://localhost:4000/projects");
    promise
      .then(response => {
        // console.log(response.data);
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
        // console.log(response.data);
        this.fetchingData();
      })
      .catch(error => {
        // console.log(error);
      });
  };
  displayProjects() {
    let data = this.state.projects.projects;
    if (data === undefined) {
      return <div>loading projects</div>;
    } else {
      return this.state.projects.projects.map(project => {
        // console.log(project._id);
        return (
          <div key={project._id} className="projectCard">
            <div>
              <span>Project:</span> {project.projectName}
            </div>
            <div>
              <span>Total Students:</span>
              {
                this.state.students
                  .length /*|| this.state.backupStudents.length}*/
              }
            </div>
            <div>
              <span>DueDate: </span>
              {project.dueDate}
            </div>
            <div className="students">
              {/*this.state.students.length > 0 */

              this.state.students.map(student => {
                // console.log("student===>", student);
                return (
                  <div key={student.fullName} className="student">
                    <div
                      onClick={() => {
                        this.props.studentTrelloInfo(
                          student.fullName,
                          student.username
                        );
                        this.props.sendGithubInf(this.state.pullRequests);
                      }}
                    >
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
              })
              // : /*this.props.logins[0].githubHandle === project.projectName &&*/
              //   this.state.backupStudents.map(student => {
              //     console.log("backupstudent===>", student);
              //     return (
              //       <div key={student.fullName} className="student">
              //         <div>
              //           <Link to="/projects/EditStudent">
              //             <span>Student:</span>
              //             {student}
              //           </Link>
              //         </div>
              //         <div>
              //           <span>Participation:</span>
              //           {student.participation}
              //         </div>
              //       </div>
              //     );
              //   })
              }
            </div>
            <div className="buttons">
              <Link to={`projects/EditProject/${project._id}`}>
                <button
                  className="editButton"
                  onClick={() => {
                    this.props.editProject(
                      project.projectName,
                      project.githubHandle,
                      project.trelloName
                    );
                  }}
                >
                  Edit
                </button>
              </Link>
              <Link to="/project-dashboard">
                <button className="dashBoardButton">Dashboard</button>
              </Link>
              <button
                className="deleteButton"
                onClick={() => {
                  // alert("hello");
                  // console.log("project=>", project._id);
                  this.deleteProject(project._id);
                }}
              >
                Delete Project
              </button>
            </div>
          </div>
        );
      });
    }
  }
  render() {
    console.log("projects props===>", this.props.logins[0]);

    this.state.pullRequests.map(request => {
      return request.user;
      console.log("githubplls ===>", request.user.login);
    });

    // console.log(" projects props ===>", this.props);

    return (
      <div className="projects">
        <h1>
          <span>Projects</span>
        </h1>
        <div className="allCards">
          {this.displayProjects()}
          <Link to="/createProject">
            <div className="newProjectCard">
              <span> New Project</span>
              <img src={require("../../pictures/add.png")} width="100px" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("projects satate ===>", state.submitProjectReducer);
  let projectId = "";
  let logins = "";
  if (
    state.submitProjectReducer.length !== 0 ||
    state.submitProjectReducer.length !== null
  ) {
    console.log(state.submitProjectReducer[0]);
    if (state.submitProjectReducer[0] !== undefined) {
      projectId = state.submitProjectReducer[0];
    }
  }
  if (
    state.trelloGithubReducer !== null ||
    state.trelloGithubReducer[0] !== undefined ||
    state.trelloGithubReducer[0] !== null
  ) {
    if (state.trelloGithubReducer.length > 0) {
      logins = state.trelloGithubReducer;
    }
  }

  return {
    logins: logins,
    projectId: projectId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProject: (projectName, githubHandle, trelloName) => {
      dispatch({
        type: "editProject",
        payload: { projectName, githubHandle, trelloName }
      });
    },
    studentTrelloInfo: (fullName, username) => {
      dispatch({
        type: "studentInfo",
        payload: {
          studentName: fullName,
          trelloName: username
        }
      });
    },
    sendGithubInf: pullRequests => {
      let requests = pullRequests.map(request => {
        return request.user;
        console.log("githubplls ===>", request.user.login);
      });
      dispatch({
        type: "studentGithubInfo",
        payload: {
          githubUsers: requests
        }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
