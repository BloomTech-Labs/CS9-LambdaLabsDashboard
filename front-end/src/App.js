import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Classes from "./Components/Classes/classes.js";
import LandingPage from "./Components/LandingPage/landingPage.js";
import Projects from "./Components/Projects/projects.js";
import Billing from "./Components/Billing/billing.js";
// import Settings from './Components/Settings/settings.js'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="app/classes" component={Classes} />
        <Route path="app/projects" component={Projects} />
        <Route path="app/billing" component={Billing} />
      </div>
    );
  }
}

export default App;
