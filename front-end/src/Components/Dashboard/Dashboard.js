import React, { Component } from 'react';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <div className='Dashboard'>
        <div>
          <h1>Hello everyone, I'm a dashboard</h1>
        </div>
      </div>
    );
  }
}