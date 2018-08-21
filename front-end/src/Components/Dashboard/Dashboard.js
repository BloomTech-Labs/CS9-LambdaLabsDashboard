import React, { Component } from 'react';
import Axios from 'axios';
import BarGraph from './BarGraph/BarGraph';
import CircleGraph from './CircleGraph/CircleGraph';
import CircleDetails from './CircleGraph/CircleDetails/CircleDetails';
import Team from './Team/Team';
import StatBox from './StatBox/StatBox';
import Github from '../../Helpers/Github';
import Trello from '../../Helpers/Trello';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: 'Labs Dashboard',
      team: [
        {
          name: 'Alex Figliolia',
          github: 'alexfigliolia',
          trellos: 0,
          merges: 0,
        },
        {
          name: 'Boomer Boomer',
          github: 'boomer1204',
          trellos: 0,
          merges: 0,
        },
        {
          name: 'Hilal Aissani',
          github: 'hillal20',
          trellos: 0,
          merges: 0,
        },
        {
          name: 'Jackee Rodrich',
          github: 'JacquelynnRohrich',
          trellos: 0,
          merges: 0,
        },
        {
          name: 'Amanda Moc',
          github: 'mocamanda',
          trellos: 0,
          merges: 0,
        },
        {
          name: 'Yasin Shuman',
          github: 'yshuman1',
          trellos: 0,
          merges: 0,
        },
      ],
      trello: {
        members: [],
        todo: [],
        inProgress: [],
        complete: []
      },
      completeness: Math.PI * (2 * 199),
      initBars: false,
      countUp: false,
      error: false,
    }
    this.trelloKey = 'cb548cca4f1358b69b3bee4a25ca02ec';
    this.trelloToken = '5b6ec3db4fe7211b52293adec51fefdd06444a2546ff8ca725dbc5c5ebefa114';
    this.auth = `?key=${this.trelloKey}&token=${this.trelloToken}`;
  }

  componentDidMount = () => {
    Axios.all([
      Axios.get(`https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/members${this.auth}`),
      Axios.get(`https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/cards${this.auth}`),
      Axios.get(`https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/lists${this.auth}`),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=all'),
    ])
    .then(res => this.parseData(res))
    .catch(err => this.setState({error: true}));
  }

  parseData = data => {
    const [ members, cards, lists, pullRequests ] = data;
    const team = new Github(this.state.team, pullRequests.data);
    const { trello, completeness, updatedTeamStats, inProgress } = new Trello(team, members.data, cards.data, lists.data);
    this.setState({ team: updatedTeamStats, trello, inProgress });
    setTimeout(() => {
      this.setState({ completeness, initBars: true, countUp: true});  
    }, 250);
  }

  render = () => {
    const { 
      project, 
      team, 
      completeness, 
      trello, 
      inProgress,
      countUp, 
      initBars, 
      error 
    } = this.state;
    // console.log(trello);
    return (
      <div className='Dashboard'>
        <div>
          <div className='top-panel'>
            <h1>{project}</h1>
          </div>
          <div className='boxes'>
            <div className='box bar-graph-box'>
              <BarGraph
                error={error}
                team={team}
                initBars={initBars} />
            </div>
            <div className='box circle-box'>
              <CircleGraph 
                error={error}
                completeness={completeness} />
              <CircleDetails 
                trello={trello}
                countUp={countUp} />
            </div>
            <div className='box team-box'>
              <Team 
                team={team}
                setHeight={this.setHeight} />
            </div>
            <div className='box stat-box'>
              {
                countUp && 
                  <StatBox
                    color="#FC4645" 
                    trello={trello['To Do'].cards}
                    title="Pending" />
              }
            </div>
            <div className='box stat-box'>
              {
                countUp && 
                  <StatBox
                    color="#FC4645" 
                    trello={inProgress}
                    title="In Progress" />
              }
            </div>
            <div className='box stat-box'>
              {
                countUp && 
                  <StatBox
                    color="#FC4645" 
                    trello={trello['Done'].cards}
                    title="Complete" />
              }
            </div>
            <div className='box stat-box'>
              {
                countUp && 
                  <StatBox
                    color="#FC4645" 
                    trello={trello['Done'].cards}
                    title="Hello!!" />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}