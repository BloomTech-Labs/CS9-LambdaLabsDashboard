import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import Classes from "./Components/Classes/classes";
import LandingPage from "./Components/LandingPage/landingPage";
import LogIn from './Components/LogIn.js';
import SignUp from './Components/SignUp';
import Projects from "./Components/Projects/projects";
import Billing from "./Components/Billing/billing";
import CreateProject from "./Components/CreateProject/createProject";
import EditProject from "./Components/EditProject/editProject";
import EditStudent from "./Components/EditStudent/editStudent";
import Settings from "./Components/Settings/settings";
import Dashboard from './Components/Dashboard/Dashboard';
import Menu from './Components/Menu/Menu';
import Header from './Components/Header/Header';
import "./App.css";

class App extends Component {

    shouldComponentUpdate = ({ location, classes }) => {
        const curProps = this.props;
        if (location !== curProps.location) return true;
        else if (classes !== curProps.classes) return true;
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
                    <Route exact path="/login" component={LogIn}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/classes" component={Classes} />
                    <Route exact path="/projects" component={Projects} />
                    <Route exact path="/billing" component={Billing} />
                    <Route exact path="/createProject" component={CreateProject} />
                    <Route exact path="/projects/EditProject/:id" component={EditProject} />
                    <Route exact path="/projects/EditStudent" component={EditStudent} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/project-dashboard" component={Dashboard} />
                </div>
            </div>
        );
    }
}

const mSTP = ({ Navigation }) => {
    return { classes: Navigation.bodyClasses };
}

export default connect(mSTP)(App);