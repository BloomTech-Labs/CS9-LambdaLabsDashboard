import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Classes from "./Components/Classes/Classes";
import LandingPage from "./Components/LandingPage/LandingPage";
import Projects from "./Components/Projects/Projects";
import Billing from "./Components/Billing/Billing";
import CreateProject from "./Components/CreateProject/Create";
import EditProject from "./Components/EditProject/EditProject";
import Settings from "./Components/Settings/Settings";
import Dashboard from "./Components/Dashboard/Dashboard";
import Menu from "./Components/Menu/Menu";
import Header from "./Components/Header/Header";
import { validateToken } from "./Actions/Navigation";
import { getClasses } from './Actions/Database';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.loader = document.getElementById("appLoader");
    this.callCount = 0;
    this.url = window.location.pathname;
  }
  
  UNSAFE_componentWillMount = () => this.props.validateToken();

  UNSAFE_componentWillReceiveProps = ({ authOnLoad, userID, history, location, getClasses }) => {
    if(authOnLoad !== this.props.authOnLoad) {
      if(authOnLoad) {
        if(location.pathname === "/") history.push(this.url === '/' ? '/classes' : this.url);
        this.removeLoader(500);
        getClasses(userID);
      } else {
        if(this.callCount === 0) this.removeLoader(1000);
      }
    }
    this.callCount++;
  }

  shouldComponentUpdate = ({ location, classes }) => {
    const curProps = this.props;
    if (location.pathname !== curProps.location.pathname) return true;
    else if (classes !== curProps.classes) return true;
    return false;
  };

  removeLoader = delay => {
    if(this.loader !== null) {
      setTimeout(() => {
        this.loader.classList.add("app-loader-hidden");
        setTimeout(() => {
          this.loader.remove();
          this.loader = null;
        }, 600);
      }, delay)
    }
  }

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
          <PrivateRoute exact path="/projects/:className" component={Projects} />
          <PrivateRoute exact path="/billing" component={Billing} />
          <PrivateRoute exact path="/createProject" component={CreateProject} />
          <PrivateRoute exact path="/projects/EditProject/:id" component={EditProject} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/project-dashboard" component={Dashboard} />
        </div>
      </div>
    );
  };
}

const mSTP = ({ Navigation }) => {
  const { bodyClasses, authOnLoad, userID } = Navigation;
  return { classes: bodyClasses, authOnLoad, userID };
};

export default connect(mSTP, { validateToken, getClasses })(App);
