import React, { Component } from 'react';
import BaseCircle from './BaseCircle/BaseCircle';
import TopCircle from './TopCircle/TopCircle';
import CountUp from 'react-countup';

export default class CircleGraph extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	fontSize: 0
	  };
	}

	componentDidMount = () => {
		this.setState({ fontSize: this.refs.stat.clientHeight/4 });
		window.addEventListener('resize', this.resize, true);
	}

	shouldComponentUpdate = ({completeness, error}, {fontSize}) => {
		const curProps = this.props;
		if(completeness !== curProps.completeness) return true;
		else if(error !== curProps.error) return true;
		else if(fontSize !== this.state.fontSize) return true;
		return false;
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.resize, true);
	}

	resize = e => {
		this.setState({ fontSize: this.refs.stat.clientHeight/4 })
	}

  render = () => {
  	const { completeness, error, color1, color2, gradientID, measure, noSubText } = this.props; 
  	const { fontSize } = this.state; 
    return (
      <div className='circle-graph'>
				<div className='circle-center'>
					<svg 
						className='circle-container'
						viewBox="0 0 500 500" 
						preserveAspectRatio="xMinYMin meet"
						style={{ filter: 'drop-shadow( 5px 0px 15px #1F2638)' }}>
						<linearGradient id={gradientID}>
	            <stop offset="0%"  stopColor={color1} />
	            <stop offset="100%" stopColor={color2} />
		        </linearGradient>
						<BaseCircle />
						<TopCircle 
							completeness={completeness}
							stroke={`url(#${gradientID})`} />
					</svg>
					<div
						ref="stat" 
						className='completeness'>
						<h4 style={{color: color1, fontSize}}>
							{
								error ? 0 :
								<CountUp
									start={0}
									end={100 - (100*completeness) / (Math.PI * (2 * 200))}
									duration={1.5}
									useEasing={true}
									onStart={e => false} />
							}
						%</h4>
						{
							!noSubText &&
							<h3 style={{color: color1, fontSize: fontSize/4}}>{measure}</h3>
						}
					</div>
				</div>
			</div>
    );
  }
}
