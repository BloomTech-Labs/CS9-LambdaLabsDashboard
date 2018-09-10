import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Billing from "./Components/Billing/Billing";
import Classes from "./Components/Classes/Classes";
// import LandingPage from "./Components/LandingPage/LandingPage";
import LandingPage from "./Components/LandingPage/LandingPage";
import Projects from "./Components/Projects/Projects";
import CreateProject from "./Components/CreateProject/CreateProject";
import Dashboard from "./Components/Dashboard/Dashboard";
import Menu from "./Components/Menu/Menu";
import Header from "./Components/Header/Header";
import Settings from './Components/Settings/Settings';
import NotFound from './Components/NotFound/NotFound';
import { validateToken } from "./Actions/Navigation";
import { getClasses, getUserInfo, resetUserData } from "./Actions/Database";
import "./App.css";
import Main from './Components/Main/Main';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.loader = document.getElementById("appLoader");
    this.callCount = 0;
    this.url = window.location.pathname;
    this.props.validateToken();
  }

  UNSAFE_componentWillReceiveProps = ({
    authOnLoad,
    userID,
    history,
    location,
    getClasses,
    getUserInfo,
    resetUserData
  }) => {
    if(authOnLoad !== this.props.authOnLoad) {
      if(authOnLoad) {
        if(location.pathname === "/") history.push(this.url === "/" ? "/classes" : this.url);
        this.removeLoader(500);
        getClasses(userID);
      } else {
        if(this.callCount === 0) this.removeLoader(1000);
        resetUserData();
        history.push('/');
      }
    }
    this.callCount++;
  };

  shouldComponentUpdate = ({ location, classes }) => {
    const curProps = this.props;
    if (location.pathname !== curProps.location.pathname) return true;
    else if (classes !== curProps.classes) return true;
    return false;
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

  render = () => {
    const { location, classes, history } = this.props;
    const notLandingPage = location.pathname !== "/";
    return (
      <div className="App">
        {notLandingPage && <Menu />}
        {notLandingPage && <Header history={history} />}
        <div className={classes}>
          {/* <Route exact path="/" component={Main} />
          <PrivateRoute exact path="/classes" component={Classes} />
          <PrivateRoute exact path="/projects/:className" component={Projects} />
          <PrivateRoute exact path="/createProject" component={CreateProject} />
          <PrivateRoute exact path="/editProject/:id" component={CreateProject} />
          <PrivateRoute path="/project/:trelloID/:githubRepo/:name" component={Dashboard} />
          <PrivateRoute exact path="/billing" component={Billing} />
          <Route exact path="/Signin" component={LandingPage} />
          <PrivateRoute exact path="/settings" component={Settings} /> */}
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/Signin" component={LandingPage} />
            <PrivateRoute exact path="/classes" component={Classes} />
            <PrivateRoute exact path="/projects/:className" component={Projects} />
            <PrivateRoute exact path="/createProject" component={CreateProject} />
            <PrivateRoute exact path="/editProject/:id" component={CreateProject} />
            <PrivateRoute path="/project/:trelloID/:githubRepo/:name" component={Dashboard} />
            <Route exact path="/billing" component={Billing} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  };
}

const mSTP = ({ Navigation }) => {
  const { bodyClasses, authOnLoad, userID } = Navigation;
  return { classes: bodyClasses, authOnLoad, userID };
};

export default connect(mSTP, { validateToken, getClasses, getUserInfo, resetUserData })(App);
