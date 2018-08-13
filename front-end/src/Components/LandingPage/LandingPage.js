import React from 'react';
import App from '../../App.js';
import { Route } from 'react-router-dom';

export default class LandingPage extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div>
        <div class="content">
          <h2>This is the LandingPage.</h2>
          <button>sign in</button>
          <Route exact path="/App" Component={ App } />
        </div>
      </div>
    );
  }
}
