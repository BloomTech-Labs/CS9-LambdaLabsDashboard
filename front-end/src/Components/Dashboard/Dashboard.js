import React, { Component } from 'react';
import CircleGraph from './CircleGraph/CircleGraph';
import Team from './Team/Team';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [
        'Alex Figliolia',
        'Alex Figliolia',
        'Alex Figliolia',
        'Alex Figliolia',
        'Alex Figliolia',
        'Alex Figliolia',
      ]
    }
  }
  render = () => {
    const { team } = this.state;
    return (
      <div className='Dashboard'>
        <div>
          <div className='top-panel'>
            <h1>Some Project</h1>
          </div>
          <div className='boxes'>
            <div className='box'>
              <CircleGraph />
            </div>
            <div className='box'>
              <Team team={team} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}