import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Classes from "./Components/Classes/classes";
import LandingPage from "./Components/LandingPage/landingPage";
import Projects from "./Components/Projects/projects";
import Billing from "./Components/Billing/billing";
import CreateProject from "./Components/CreateProject/createProject";
import EditProject from "./Components/EditProject/editProject";
import EditStudent from "./Components/EditStudent/editStudent";
import Settings from "./Components/Settings/settings";
import Dashboard from "./Components/Dashboard/Dashboard";
import Menu from "./Components/Menu/Menu";
import Header from "./Components/Header/Header";
import "./App.css";

class App extends Component {
  shouldComponentUpdate = ({ location, classes }) => {
    const curProps = this.props;
    if (location.pathname !== curProps.location.pathname) return true;
    else if (classes !== curProps.classes) return true;
    return false;
  };

  render = () => {
    const { location, classes, history } = this.props;
    const notLandingPage = location.pathname !== "/";
    return (
      <div className="App">
        {notLandingPage && <Menu />}
        {notLandingPage && <Header history={history} />}
        <div className={classes}>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute exact path="/classes" component={Classes} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <PrivateRoute exact path="/billing" component={Billing} />
          <PrivateRoute exact path="/createProject" component={CreateProject} />
          <PrivateRoute
            exact
            path="/projects/EditProject/:id"
            component={EditProject}
          />
          <PrivateRoute
            exact
            path="/projects/EditStudent"
            component={EditStudent}
          />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/project-dashboard" component={Dashboard} />
        </div>
      </div>
    );
  };
}

const mSTP = ({ Navigation }) => {
  return { classes: Navigation.bodyClasses };
};

export default connect(mSTP)(App);
