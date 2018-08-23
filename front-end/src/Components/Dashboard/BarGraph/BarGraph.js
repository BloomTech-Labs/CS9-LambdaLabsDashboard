import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import YAxis from './YAxis/YAxis';
import XAxis from './XAxis/XAxis';
import Graph from './Graph/Graph';
import Key from './Key/Key';

class BarGraph extends PureComponent {

  getMaxStat = () => {
    const { team } = this.props;
    let tMax = 0, gMax = 0;
    for(let i = 0; i<team.length; i++) {
      const { trellos, merges } = team[i];
      if(trellos > tMax) tMax = trellos;
      if(merges > gMax) gMax = merges;
    }
    return Math.max(tMax, gMax);
  }

  render = () => {
  	const { team } = this.props;
    const maxStat = Math.round(this.getMaxStat() / 10) * 10;
    return (
      <div className='bar-graph'>
        <h2>Student Contributions</h2>
      	<div className='grid-container'>
          <YAxis maxStat={maxStat}/>
      		<Graph maxStat={maxStat} />
      	</div>
        <XAxis team={team} />
        <Key />
      </div>
    );
  }
}

const mSTP = ({ ExternalApis }) => {
  return { team: ExternalApis.team };
}

export default connect(mSTP)(BarGraph);