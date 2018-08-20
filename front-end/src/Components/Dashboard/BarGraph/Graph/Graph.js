import React, { Component } from 'react';
import BarContainer from './BarContainer/BarContainer';

export default class Graph extends Component {
  render = () => {
  	const { team, initBars, maxStat } = this.props;
  	const { length } = team;
    return (
      <div className='graph-grid'>
      	{
      		team.map((dude, i) => {
      			const { trellos, merges } = dude;
      			return (
      				<BarContainer 
      					key={i}
                index={i}
      					trellos={trellos}
      					merges={merges}
      					length={length}
                maxStat={maxStat}
                initBars={initBars} />
      			);
      		})
      	}
      </div>
    );
  }
}