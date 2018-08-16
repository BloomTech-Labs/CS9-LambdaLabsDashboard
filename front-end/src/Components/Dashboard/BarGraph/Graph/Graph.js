import React, { Component } from 'react';
import BarContainer from './BarContainer/BarContainer';

export default class Graph extends Component {
  render = () => {
  	const { team, initBars } = this.props;
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
                initBars={initBars} />
      			);
      		})
      	}
      </div>
    );
  }
}