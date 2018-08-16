import React, { Component } from 'react';
import Graph from './Graph/Graph';

export default class BarGraph extends Component {

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
          <div className='y-axis'>
            {
              [0,1,2,3,4,5,6,7,8,9].map(stat => {
                if(stat % 2 === 0) {
                  return (
                    <div 
                      key={stat}
                      data-stat={maxStat - ((maxStat/10)*stat)}
                      className='y-axis-tick'></div>
                  );
                }
                return (
                  <div 
                    key={stat}
                    data-stat=""
                    className='y-axis-tick'></div>
                );
              })
            }
          </div>
      		<Graph 
            team={team}
            initBars={initBars} />
      	</div>
        <div 
          className='contributors'
          style={{
            marginLeft: 30 - (length - 1) + 'px'
          }}>
          {
            team.map((dude, i) => {
              const { name } = dude;
              const [ first, last ] = name.split(" ");
              return (
                <div 
                  key={i}
                  className='contributor'
                  style={{
                    width: 100/length + '%'
                  }}>
                  <h5 style={{
                    marginLeft: -(300/length) + '%'
                  }}>{`${first} ${last[0]}`}</h5>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}