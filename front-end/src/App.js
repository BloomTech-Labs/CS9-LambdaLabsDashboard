import React, { Component } from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import './App.css';

class App extends Component {
  render = () => {
    return (
      <div className="App">
        {/*Comment my componenet out if you're working on your own feature 
        at the base level! - Love Alex */}
        <Dashboard />
      </div>
    );
  }
}

export default App;
