import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Classes from "./Components/Classes/classes";
import LandingPage from "./Components/LandingPage/LandingPage";
import Projects from "./Components/Projects/projects";
import Billing from "./Components/Billing/billing";
import CreateProject from "./Components/CreateProject/createProject";
import EditProject from "./Components/EditProject/editProject";
import EditStudent from "./Components/EditStudent/editStudent";
import Settings from "./Components/Settings/settings";
import Dashboard from "./Components/Dashboard/Dashboard";
import Menu from "./Components/Menu/Menu";
import Header from "./Components/Header/Header";
import { validateToken } from "./Actions/Navigation";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.loader = document.getElementById("appLoader");
    this.callCount = 0;
  }

  UNSAFE_componentWillMount = () => this.props.validateToken();

  UNSAFE_componentWillReceiveProps = ({ authOnLoad, history, location }) => {
    if (authOnLoad !== this.props.authOnLoad) {
      if (authOnLoad) {
        if (location.pathname === "/") history.push("/projects");
        this.removeLoader(500);
      } else {
        if (this.callCount === 0) this.removeLoader(1000);
      }
    }
    this.callCount++;
  };

  removeLoader = delay => {
    if (this.loader !== null) {
      setTimeout(() => {
        this.loader.classList.add("app-loader-hidden");
        setTimeout(() => {
          this.loader.remove();
          this.loader = null;
        }, 600);
      }, delay);
    }
  };

  shouldComponentUpdate = ({ location, classes }) => {
    const curProps = this.props;
    if (location.pathname !== curProps.location.pathname) return true;
    else if (classes !== curProps.classes) return true;
    return false;
  };

  render = () => {
    const { location, classes } = this.props;
    const notLandingPage = location.pathname !== "/";
    return (
      <div className="App">
        {notLandingPage && <Menu />}
        {notLandingPage && <Header />}
        <div className={classes}>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/classes" component={Classes} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/createProject" component={CreateProject} />
          <Route
            exact
            path="/projects/EditProject/:id"
            component={EditProject}
          />
          <Route exact path="/projects/EditStudent" component={EditStudent} />
          <Route path="/settings" component={Settings} />
          <Route path="/project-dashboard" component={Dashboard} />
        </div>
      </div>
    );
  };
}

const mSTP = ({ Navigation }) => {
  const { bodyClasses, authOnLoad } = Navigation;
  return { classes: bodyClasses, authOnLoad };
};

export default connect(
  mSTP,
  { validateToken }
)(App);
