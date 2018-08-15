import React, { Component } from 'react';
import CircleGraph from './CircleGraph/CircleGraph';
import CircleDetails from './CircleGraph/CircleDetails/CircleDetails';
import Team from './Team/Team';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: 'Labs Dashboard',
      team: [
        {
          name: 'Alex Figliolia',
          github: 'alexfigliolia',
        },
        {
          name: 'Alex Figliolia',
          github: 'alexfigliolia',
        },
        {
          name: 'Alex Figliolia',
          github: 'alexfigliolia',
        },
        {
          name: 'Alex Figliolia',
          github: 'alexfigliolia',
        },
        {
          name: 'Alex Figliolia',
          github: 'alexfigliolia',
        },
        {
          name: 'Alex Figliolia',
          github: 'alexfigliolia',
        },
      ],
      trello: {
        todo: [
          'Write routes for joe momma',
          'Build ui for joe momma',
          'Build auth for joe momma'
        ],
        inProgress: [
          'Login-logout',
          'Reset password',
          'style guide',
          'tie my shoes'
        ],
        complete: [
          'Front-end routing',
          'Login view',
          'Navigation view',
          'Make some chicken'
        ]
      },
      completeness: Math.PI * (2 * 199),
      boxHeight: null,
      countUp: false
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ completeness: Math.PI * (2 * 50)});  
      setTimeout(() => this.setState({countUp: true}), 500);
    }, 1000);
  }

  setHeight = height => this.setState({boxHeight: height});

  render = () => {
    const { project, team, completeness, trello, boxHeight, countUp } = this.state;
    return (
      <div className='Dashboard'>
        <div>
          <div className='top-panel'>
            <h1>{project}</h1>
          </div>
          <div className='boxes'>
            <div 
              className='box'
              style={{height: boxHeight ? boxHeight : 'auto'}}>
              <CircleGraph completeness={completeness} />
              <CircleDetails 
                trello={trello}
                countUp={countUp} />
            </div>
            <div 
              className='box'
              style={{height: boxHeight ? boxHeight : 'auto'}}>
              <Team 
                team={team}
                boxHeight={boxHeight}
                setHeight={this.setHeight} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}