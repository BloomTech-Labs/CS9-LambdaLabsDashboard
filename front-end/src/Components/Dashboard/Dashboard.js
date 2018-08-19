import React, { Component } from 'react';
import BarGraph from './BarGraph/BarGraph';
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
          merges: 7,
          trellos: 9,
        },
        {
          name: 'Steve Figliolia',
          github: 'alexfigliolia',
          merges: 4,
          trellos: 7,
        },
        {
          name: 'Hilal Aissani',
          github: 'alexfigliolia',
          merges: 7,
          trellos: 8,
        },
        {
          name: 'Jackee Rodrich',
          github: 'alexfigliolia',
          merges: 2,
          trellos: 4,
        },
        {
          name: 'Amanda Moc',
          github: 'alexfigliolia',
          merges: 9,
          trellos: 6,
        },
        {
          name: 'Yasin Shuman',
          github: 'alexfigliolia',
          merges: 5,
          trellos: 3,
        },
        {
          name: 'SpongeBob S.',
          github: 'alexfigliolia',
          merges: 5,
          trellos: 3,
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
      initBars: false,
      countUp: false
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ completeness: Math.PI * (2 * 50), initBars: true});  
      setTimeout(() => this.setState({countUp: true}), 500);
    }, 500);
  }

  render = () => {
    const { project, team, completeness, trello, countUp, initBars } = this.state;
    return (
      <div className='Dashboard'>
        <div>
          <div className='top-panel'>
            <h1>{project}</h1>
          </div>
          <div className='boxes'>
            <div className='box bar-graph-box'>
              <BarGraph 
                team={team}
                initBars={initBars} />
            </div>
            <div className='box circle-box'>
              <CircleGraph completeness={completeness} />
              <CircleDetails 
                trello={trello}
                countUp={countUp} />
            </div>
            <div className='box team-box'>
              <Team 
                team={team}
                setHeight={this.setHeight} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}