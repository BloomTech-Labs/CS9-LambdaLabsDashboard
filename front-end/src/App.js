import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
<<<<<<< HEAD
import Classes from "./Components/Classes/classes";
<<<<<<< HEAD
import LandingPage from "./Components/LandingPage/landingPage";
import SignIn from './Components/signIn.js';
import SignUp from './Components/SignUp';
=======
import LandingPage from "./Components/LandingPage/LandingPage";
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
import Projects from "./Components/Projects/projects";
=======
import Classes from "./Components/Classes/Classes";
import LandingPage from "./Components/LandingPage/LandingPage";
import Projects from "./Components/Projects/Projects";
>>>>>>> 8023cfb2cc4d5ae6d4e11e3fa30c056b9e8b9269
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

<<<<<<< HEAD
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
                    <Route exact path="/signin" component={SignIn}/>
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
=======
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
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf
