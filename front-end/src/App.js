import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Classes from "./Components/Classes/classes";
import LandingPage from "./Components/LandingPage/LandingPage";
import Projects from "./Components/Projects/projects";
import Billing from "./Components/Billing/Billing";
import CreateProject from "./Components/CreateProject/createProject";
import EditProject from "./Components/EditProject/editProject";
import EditStudent from "./Components/EditStudent/editStudent";
import Settings from "./Components/Settings/Settings";
import Dashboard from "./Components/Dashboard/Dashboard";
import Menu from "./Components/Menu/Menu";
import Header from "./Components/Header/Header";
import { validateToken } from './Actions/Navigation';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.loader = document.getElementById('appLoader');
    this.callCount = 0;
  }
  
  UNSAFE_componentWillMount = () => this.props.validateToken();

  UNSAFE_componentWillReceiveProps = ({ authOnLoad, history }) => {
    if(authOnLoad !== this.props.authOnLoad) {
      if(authOnLoad) {
        history.push('/projects');
        this.removeLoader(500)
      } else {
        if(this.callCount === 0) {
          this.removeLoader(1000);
        }
      }
    }
    this.callCount++;
  }

  removeLoader = delay => {
    if(this.loader !== null) {
      setTimeout(() => {
        this.loader.classList.add('app-loader-hidden');
        setTimeout(() => {
          this.loader.remove();
          this.loader = null;
        }, 600);
      }, delay)
    }
  }

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
          <PrivateRoute exact path="/projects/EditStudent" component={EditStudent} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/project-dashboard" component={Dashboard} />
        </div>
      </div>
    );
  };
}

const mSTP = ({ Navigation }) => {
  const { bodyClasses, authOnLoad } = Navigation;
  return { classes: bodyClasses, authOnLoad };
};

export default connect(mSTP, { validateToken })(App);
