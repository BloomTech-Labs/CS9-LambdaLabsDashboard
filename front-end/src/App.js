import React, { Component } from "react";
import { connect } from 'react-redux';
import "./App.css";
import { Route } from "react-router-dom";
import Classes from "./Components/Classes/classes";
import LandingPage from "./Components/LandingPage/LandingPage";
import Projects from "./Components/Projects/projects";
import Billing from "./Components/Billing/billing";
import CreateProject from "./Components/CreateProject/createProject";
import EditProject from "./Components/EditProject/editProject";
import Settings from "./Components/Settings/Settings";
import Dashboard from './Components/Dashboard/Dashboard';
import Menu from './Components/Menu/Menu';
import Header from './Components/Header/Header';

class App extends Component {

  shouldComponentUpdate = ({ location, classes }) => {
    const curProps = this.props;
    if(location !== curProps.location) return true;
    else if(classes !== curProps.classes) return true;
    return false;
  }

  render = () => {
    const { location, classes } = this.props;
    const notLandingPage = location.pathName !== 'LandingPage';
    return (
      <div className='App'>
        {
          notLandingPage &&
          <Menu />
        }
        {
          notLandingPage &&
          <Header />
        }
        <div className={classes}>
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
      </div>
    );
  }
}

const mSTP = ({ Navigation }) => {
  return { classes: Navigation.bodyClasses }; 
}

export default connect(mSTP)(App);
