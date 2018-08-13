import React, { Component } from 'react';
import BaseCircle from './BaseCircle/BaseCircle';
import TopCircle from './TopCircle/TopCircle';
import CountUp from 'react-countup';

export default class CircleGraph extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	completeness: Math.PI * (2 * 199)
	  }
	}

	componentDidMount = () => {
		setTimeout(() => {
			this.setState({ completeness: Math.PI * (2 * 50) });	
		}, 1000);
	}

  render = () => {
  	const { completeness } = this.state; 
    return (
      <div className='circle-graph'>
				<div className='circle-center'>
					<svg 
						className='circle-container'
						viewBox="0 0 500 500" 
						preserveAspectRatio="xMinYMin meet"
						style={{ filter: `drop-shadow( 0px 0px 7.5px #74E0FF)` }}>
						<linearGradient id="blueGradient">
	            <stop offset="0%"  stopColor="#74E0FF" />
	            <stop offset="100%" stopColor="#48A3FF" />
		        </linearGradient>
						<BaseCircle />
						<TopCircle 
							completeness={completeness}
							stroke="url(#blueGradient)" />
					</svg>
					<div className='completeness'>
						<h4>
							<CountUp
								start={0}
								end={100 - (100*completeness) / (Math.PI * (2 * 200))}
								duration={1.5}
								useEasing={true}
								onStart={e => false} />
						%</h4>
						<h3>Completeness</h3>
					</div>
				</div>
			</div>
    );
  }
}
