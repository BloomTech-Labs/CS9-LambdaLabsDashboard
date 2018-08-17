import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Classes from "./Components/Classes/classes.js";
import LandingPage from "./Components/LandingPage/landingPage.js";
import Projects from "./Components/Projects/projects.js";
import Billing from "./Components/Billing/billing.js";
import CreateProject from "./Components/CreateProject/createProject.js";
import EditProject from "./Components/EditProject/editProject.js";
import EditStudent from "./Components/EditStudent/editStudent.js";
<<<<<<< HEAD
// import Settings from "./Components/Settings/settings.js";
import Sidenav from "./Components/Sidenav/sidenav.js"
import TopNav from "./Components/topNav.js";
=======
import Settings from "./Components/Settings/settings.js";
>>>>>>> 64842ba74ef949fabd3d7bcf9e50fa8317d39f78

class App extends Component {
  render() {
    return (
      <div>
        <TopNav/>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/classes" component={Classes} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/createProject" component={CreateProject} />
        <Route exact path="/projects/EditProject/:id" component={EditProject} />
        <Route exact path="/projects/EditStudent" component={EditStudent} />
        <Route path="/classes" component={Classes} />
        <Route path="/billing" component={Billing} />
        <Route path="/settings" component={Settings} />
      </div>
    );
  }
}

export default App;
