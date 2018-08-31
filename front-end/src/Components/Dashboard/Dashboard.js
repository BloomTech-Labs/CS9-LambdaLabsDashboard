import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import BarGraph from './BarGraph/BarGraph';
import CircleGraph from './CircleGraph/CircleGraph';
import CircleDetails from './CircleGraph/CircleDetails/CircleDetails';
import Team from './Team/Team';
import StatBox from './StatBox/StatBox';
import { getDataForProject } from '../../Actions/ExternalApis';

class Dashboard extends PureComponent {

  componentDidMount = () => {
    window.scrollTo(0, 0);
    const { history, match, getDataForProject } = this.props;
    const { githubRepo, trelloID } = match.params; 
    if(!githubRepo || !trelloID) history.push('/classes');
    else {
      const { githubRepo, trelloID } = match.params; 
      getDataForProject(githubRepo, trelloID); 
    }
  }

  render = () => {
    const { trello, countUp, completeness, match } = this.props;
    const { name } = match.params;
    return (
      <div className='Dashboard'>
        <div>
          <div className='top-panel'>
            <h1>{name}</h1>
          </div>
          <div className='boxes'>
            <div className='box bar-graph-box'>
              <BarGraph />
            </div>
            <div className='box circle-box'>
              <div 
                className='bottom'
                style={{
                  background: 'linear-gradient(to right, #74E0FF, #48A3FF)',
                  display: 'flex'
                }}></div>
              <CircleGraph 
                completeness={completeness}
                color1="#74E0FF"
                color2="#48A3FF"
                gradientID="completeness"
                measure="Completeness" />
              <CircleDetails  />
            </div>
            <div className='box team-box'>
              <div 
                className='bottom'
                style={{
                  background: 'linear-gradient(to right, #74E0FF, #48A3FF)',
                  display: 'flex'
                }}></div>
              <Team setHeight={this.setHeight} />
            </div>
            <div className='box stat-box'>
              <div 
                className='bottom'
                style={{
                  background: 'linear-gradient(to right, #FC555B, #FC2C65)'
                }}></div>
              <StatBox
                color1="#FC555B"
                color2="#FC2C65"
                gradientID="pending"
                trello={countUp ? trello['To Do'].cards : []}
                title="Pending"
                measure="Pending" />
            </div>
            <div className='box stat-box'>
              <div 
                className='bottom'
                style={{
                  background: 'linear-gradient(to right, #FD9121, #FC4026)'
                }}></div>
              <StatBox
                color1="#FD9121"
                color2="#FC4026"
                gradientID="inProg"
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
                color1="#B478F9"
                color2="#9F46FB"
                gradientID="testing"
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
                color1="#4CFFBE"
                color2="#51FF61"
                gradientID="complete"
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

const mSTP = ({ ExternalApis }) => {
  const { project, trello, countUp, completeness } = ExternalApis;
  return { project, trello, countUp, completeness };
}

export default connect(mSTP, { getDataForProject })(Dashboard);