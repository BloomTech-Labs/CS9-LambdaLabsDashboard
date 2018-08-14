import React, { Component } from "react";
import Sidenav from "../Sidenav/sidenav";
import CreateProject from "../CreateProject/createProject.js";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import "./projects.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.fetchingData();
  }

  fetchingData = () => {
    const promise = axios.get("http://localhost:4000/projects");
    promise
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="projects">
        <Sidenav />
        <h1>PROJECTS</h1>
        <Link to="/createProject">
          <button>Create New Project</button>
        </Link>
      </div>
    );
  }
}

export default Projects;
