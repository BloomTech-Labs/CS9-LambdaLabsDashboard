import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Classes from "./Components/Classes/classes";
import LandingPage from "./Components/LandingPage/LandingPage";
import Projects from "./Components/Projects/projects";
import Billing from "./Components/Billing/billing";
import CreateProject from "./Components/CreateProject/createProject";
import EditProject from "./Components/EditProject/editProject";
import Settings from "./Components/Settings/settings";
import Dashboard from './Components/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/classes" component={Classes} />
        <Route path="/projects" component={Projects} />
        <Route path="/billing" component={Billing} />
        <Route path="/settings" component={Settings} />
        <Route path="/project-dashboard" component={Dashboard} />
        <Route
          exact
          path="/createProject"
          CreateProject
          component={CreateProject}
        />
        <Route
          exact
          path="/projects/:id"
          CreateProject
          component={EditProject}
        />
      </div>
    );
  }
}

export default App;
