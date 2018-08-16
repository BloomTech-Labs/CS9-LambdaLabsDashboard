import React, { PureComponent } from 'react';
import YAxis from './YAxis/YAxis';
import XAxis from './XAxis/XAxis';
import Graph from './Graph/Graph';
import Key from './Key/Key';

export default class BarGraph extends PureComponent {

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
  	const { team, initBars } = this.props;
    const maxStat = Math.round(this.getMaxStat() / 10) * 10;
    const { length } = team;
    return (
      <div className='bar-graph'>
        <h2>Student Contributions</h2>
      	<div className='grid-container'>
          <YAxis maxStat={maxStat}/>
      		<Graph 
            team={team}
            initBars={initBars} />
      	</div>
        <XAxis team={team} />
        <Key />
      </div>
    );
  }
}