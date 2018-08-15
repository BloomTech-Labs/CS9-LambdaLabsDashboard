import React, { Component } from 'react';
import Graph from './Graph/Graph';

export default class BarGraph extends Component {
  render = () => {
  	const { team } = this.props;
    return (
      <div className='bar-graph'>
      	<div>
      		<Graph team={team} />
      	</div>
      </div>
    );
  }
}