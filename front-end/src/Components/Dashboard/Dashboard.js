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
          name: 'Jackee Rohrich',
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
      totalCards: 0,
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
    const { trello, completeness, updatedTeamStats, totalCards, inProgress } = new Trello(team, members.data, cards.data, lists.data);
    this.setState({ team: updatedTeamStats, trello, totalCards, inProgress });
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
      countUp, 
      initBars, 
      totalCards,
      error 
    } = this.state;
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
              <div 
                className='bottom'
                style={{
                  background: 'linear-gradient(to right, #74E0FF, #48A3FF)',
                  display: 'flex'
                }}></div>
              <CircleGraph 
                color1="#74E0FF"
                color2="#48A3FF"
                gradientID="completeness"
                error={error}
                completeness={completeness}
                measure="Completeness" />
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
              <div 
                className='bottom'
                style={{
                  background: 'linear-gradient(to right, #FC555B, #FC2C65)'
                }}></div>
              <StatBox
                error={error}
                countUp={countUp}
                color1="#FC555B"
                color2="#FC2C65"
                gradientID="pending"
                total={totalCards} 
                trello={countUp ? trello['To Do'].cards : []}
                title="Pending"
                measure="Pending" />
          
            </div>
            <div className='box stat-box'>
              <div 
                className='bottom'
                style={{
                  background: 'linear-gradient(to right, #93BAFF, #6CB0FF)'
                }}></div>
              <StatBox
                error={error}
                countUp={countUp}
                color1="#93BAFF"
                color2="#6CB0FF"
                gradientID="inProg"
                total={totalCards} 
                trello={countUp ? trello['In Progress'].cards : []}
                title="In Progress"
                measure="In Progress" />
          
            </div>
            <div className='box stat-box'>
              <div 
                className='bottom'
                style={{
                  background: 'linear-gradient(to right, #B478F9, #9F46FB)'
                }}></div>
              <StatBox
                error={error}
                countUp={countUp}
                color1="#B478F9"
                color2="#9F46FB"
                gradientID="testing"
                total={totalCards} 
                trello={countUp ? trello['Testing'].cards : []}
                title="Testing"
                measure="Testing" />
          
            </div>
            <div className='box stat-box'>
              <div 
                className='bottom'
                style={{
                  background: 'linear-gradient(to right, #51FF61, #4CFFBE)'
                }}></div>
              <StatBox
                error={error}
                countUp={countUp}
                color1="#4CFFBE"
                color2="#51FF61"
                gradientID="complete"
                total={totalCards} 
                trello={countUp ? trello['Done'].cards : []}
                title="Complete"
                measure="Completed" />
          
            </div>
          </div>
        </div>
      </div>
    );
  }
}