import React, { Component } from "react";
import { connect } from "react-redux";
// import CreateProject from "../CreateProject/createProject.js";
import { Link } from "react-router-dom";
import axios from "axios";
import "./projects.css";
import Helpers from "./helpers.js";
// import { Button } from "react-bootstrap";
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: {
        projects: [],
        students: []
      },
      backStudents: [],
      students: [],
      pullRequests: [],
      trelloCards: [],
      trelloList: [],
      listOfStudents: []
    };
    this.arr = [];
    this.number = -1;
    this.trelloKey = "cb548cca4f1358b69b3bee4a25ca02ec";
    this.trelloToken =
      "5b6ec3db4fe7211b52293adec51fefdd06444a2546ff8ca725dbc5c5ebefa114";
    this.auth = `?key=${this.trelloKey}&token=${this.trelloToken}`;
  }

  componentWillMount() {
    if (this.props.logins[0] !== undefined) {
      this.fetchingMembersFromTrello(this.props.logins[0].trelloName);
      this.fetchingPullsFromGithub(this.props.logins[0].githubHandle);
      // this.fetchingCardsFromTrello(this.props.logins[0].trelloName);
      // this.fetchingListsFromTrello(this.props.logins[0].trelloName);
    }
    if (this.props.projectId) {
      // if (this.props.projectId.projectId !== undefined) {
      setTimeout(() => {
        this.savingStudentsInDB();
      }, 500);

      setTimeout(() => {
        this.fetchingStudentsFromDataBase();
      }, 1000);
      // x}
    }
  }

  componentDidMount() {
    // if (this.props.projectId) {
    //   // if (this.props.projectId.projectId !== undefined) {
    //   setTimeout(() => {
    //     this.savingStudentsInDB();
    //   }, 500);

    //   setTimeout(() => {
    //     this.fetchingStudentsFromDataBase();
    //   }, 1000);
    //   // x}
    // }
    setTimeout(() => {
      this.fetchingData();
    }, 2000);
  }
  // shouldComponentUpdate() {
  //   if (this.props.projectId.projectId) {
  //     if (this.props.projectId.projectId !== undefined) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // fetchingCardsFromTrello(x) {
  //   if (x === undefined || x === null) {
  //     return;
  //   }
  //   const cards = axios.get(
  //     `https://api.trello.com/1/boards/${x}/cards${this.auth}`
  //   );
  //   cards
  //     .then(res => {
  //       console.log("cards ====>", res);
  //       if (res.data !== undefined || res.data !== undefined) {
  //         this.setState({ trelloCards: res.data });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // fetchingListsFromTrello(x) {
  //   if (x === undefined || x === null) {
  //     return;
  //   }
  //   const lists = axios.get(
  //     `https://api.trello.com/1/boards/${x}/lists${this.auth}`
  //   );

  //   lists
  //     .then(res => {
  //       console.log("lists ====>", res);
  //       if (res.data !== undefined || res.data !== undefined) {
  //         this.setState({ trelloList: res.data });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  fetchingPullsFromGithub(x) {
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
    if (x === undefined || x === null) {
      return;
    }
    const members = axios.get(
      `https://api.trello.com/1/boards/${x}/members${this.auth}`
    );

    members
      .then(res => {
        console.log("members ====>", res.data);

        if (res.data !== undefined) {
          this.setState({ students: res.data });
          console.log("this.state.students==>", this.state.students);
        }
      })
      .catch(err => {
        this.setState({ students: [] });
        console.log("err ====>", err);
        console.log("this.state.students==>", this.state.students);
      });
  }

  savingStudentsInDB = () => {
    console.log("===>savingS", this.state.students);

    const object = {};
    let arr = [];
    if (this.state.students.length === 0 || this.state.students === undefined) {
      arr = [];
    }

    if (this.state.students.length > 0) {
      this.state.students.map(student => {
        arr.push(student.fullName);
      });
    }
    object.users = arr;
    object.projectId = this.props.projectId.projectId;
    console.log("saving obj ===>", object);
    const promise = axios.post("http://localhost:4000/projectUsers", object);
    promise
      .then(res => {
        console.log("saving students in data base===>", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  // shouldComponentUpdate() {
  //   if (this.props.projectId.projectId === undefined) {
  //     return false;
  //   }
  //   return true;
  // }
  fetchingStudentsFromDataBase() {
    let students = [];
    console.log("===>fetchS", this.props.projectId.projectId);

    if (this.props.projectId.projectId) {
      console.log("===>fetchS", this.props.projectId.projectId);
      const promise = axios.get(`http://localhost:4000/projectUsers`);
      promise
        .then(res => {
          console.log("resstudents ===>", res.data.s);
          if (res.data) {
            if (res.data.s !== undefined) {
              this.setState({ backStudents: res.data.s });
            }

            console.log("StateBackStudent===>", this.state.backStudents);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  fetchingData() {
    const promise = axios.get("http://localhost:4000/projects");
    promise
      .then(response => {
        this.setState({
          projects: {
            projects: response.data.projects
          }
        });

        console.log("this.state.projects====>", this.state.projects);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteProject = id => {
    const promise = axios.delete(`http://localhost:4000/projects/${id}`);
    promise
      .then(response => {
        this.fetchingData();
      })
      .catch(error => {
        console.log(error);
      });

    const promise2 = axios.delete(`http://localhost:4000/projectUsers/${id}`);
    promise2
      .then(response => {
        // this.fetchingData();
      })
      .catch(error => {});
  };

  displayProjects() {
    let student = "";
    let data = this.state.projects;
    if (data === undefined) {
      return <div>loading projects</div>;
    } else {
      return this.state.projects.projects.map(project => {
        return (
          <div key={project._id} className="projectCard">
            <div>
              <span>Project:</span> {project.projectName}
            </div>
            <div>
              <span>Total Students:</span>
              {
                this.state.backStudents
                  .length /*|| this.state.backupStudents.length}*/
              }
            </div>
            <div>
              <span>DueDate: </span>
              {project.dueDate}
            </div>
            <div className="students">
              {this.state.backStudents.map((s, i) => {
                console.log("bakupsstudent===>", s);
                if (s.projectId === project._id) {
                  student = s;
                }
                return (
                  <div key={s._id} className="student">
                    <div
                      onClick={() => {
                        // this.state.students.map(s => {
                        //   if (student === s.fullName) {
                        //     this.props.studentTrelloInfo(
                        //       s.fullName,
                        //       s.username
                        //     );
                        //   }
                        // });

                        // this.props.studentTrelloInfo(
                        //   student.fullName,
                        //   student.username
                        // );

                        this.props.sendGithubInf(this.state.pullRequests);
                        setTimeout(() => {
                          this.props.history.push("/projects/EditStudent");
                        }, 3000);
                      }}
                    >
                      {student.users &&
                        student.users.map(st => {
                          return <div key={st}>{st}</div>;
                        })}
                    </div>
                    <div />
                  </div>
                );
              })}
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
    this.state.pullRequests.map(request => {
      return request.user;
      // console.log("githubplls ===>", request.user.login);
    });

    // console.log(" projects props ===>", this.props);

    return (
      <div className="projects">
        <div className="allCards">
          {this.displayProjects()}
          <Link to="/createProject">
            <div className="newProjectCard">
              <img src={require("../../pictures/add.png")} width="100px" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("projects satate ===>", state.catchingStudents);
  let projectId = "";
  let logins = "";
  let students = [];
  // if (state.catchingStudents) {
  //   if (
  //     state.catchingStudents.length !== 0 ||
  //     state.catchingStudents.length !== null
  //   ) {
  //     if (state.catchingStudents !== undefined) {
  //       students = state.catchingStudents;
  //     }
  //   }
  // }

  if (state.submitProjectReducer) {
    if (
      state.submitProjectReducer.length !== 0 ||
      state.submitProjectReducer.length !== null
    ) {
      console.log(state.submitProjectReducer[0]);
      if (state.submitProjectReducer[0] !== undefined) {
        projectId = state.submitProjectReducer[0];
      }
    }
  }
  // if (
  //   state.submitProjectReducer.length !== 0 ||
  //   state.submitProjectReducer.length !== null
  // ) {
  //   console.log(state.submitProjectReducer[0]);
  //   if (state.submitProjectReducer[0] !== undefined) {
  //     projectId = state.submitProjectReducer[0];
  //   }
  // }
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
    projectId: projectId,
    students: students
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
    // sendingStudentsToProjects: x => {
    //   dispatch({
    //     type: "databaseStudents",
    //     payload: x
    //   });
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
