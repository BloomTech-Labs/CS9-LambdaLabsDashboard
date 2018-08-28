import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import BaseCircle from './BaseCircle/BaseCircle';
import TopCircle from './TopCircle/TopCircle';
import Loader from '../../Loader/Loader';

class CircleGraph extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	fontSize: 0,
	  	animate: false,
	  };
	}

	componentDidMount = () => {
		this.setState({ fontSize: this.refs.stat.clientHeight/4, animate: true });
		window.addEventListener('resize', this.resize, true);
	}

	shouldComponentUpdate = ({completeness, error, dataLength}, {fontSize}) => {
		const curProps = this.props;
		if(completeness !== curProps.completeness) return true;
		else if(error !== curProps.error) return true;
		else if(fontSize !== this.state.fontSize) return true;
		else if(dataLength !== curProps.dataLength) return true;
		return false;
	}

	componentWillUnmount = () => {
		this.setState({ animate: false });
		window.removeEventListener('resize', this.resize, true);
	}

	resize = e => {
		this.setState({ fontSize: this.refs.stat.clientHeight/4 })
	}

  render = () => {
  	const { dataLength, completeness, error, color1, color2, gradientID, measure, noSubText } = this.props; 
  	const { fontSize, animate } = this.state; 
    return (
      <div className='circle-graph'>
				<div className='circle-center'>
					<svg 
						className='circle-container'
						viewBox="0 0 500 500" 
						preserveAspectRatio="xMinYMin meet"
						style={{ filter: 'drop-shadow( 5px 0px 15px #1B2131)' }}>
						<linearGradient id={gradientID}>
	            <stop offset="0%"  stopColor={color1} />
	            <stop offset="100%" stopColor={color2} />
		        </linearGradient>
						<BaseCircle />
						<TopCircle 
							completeness={animate ? completeness : Math.PI * (2 * 199)}
							stroke={`url(#${gradientID})`} />
					</svg>
					<div
						ref="stat" 
						className='completeness'>
						{
							dataLength === 0 && !error &&
							<Loader dimensions={50} />
						}
						<h4 style={{color: color1, fontSize}}>
							{
								error ? 0 : dataLength > 0 ?
								<CountUp
									start={0}
									end={100 - (100*completeness) / (Math.PI * (2 * 200))}
									duration={1.5}
									useEasing={true}
									onStart={e => false} />
								: ""
							}
						{dataLength > 0 || error ? '%' : ''}</h4>
						{
							!noSubText && dataLength > 0 &&
							<h3 style={{color: color1, fontSize: fontSize/4}}>{measure}</h3>
						}
					</div>
				</div>
			</div>
    );
  }
}

const mSTP = ({ ExternalApis }) => {
	const { error, team } = ExternalApis;
	return { error, dataLength: team.length };
}

export default connect(mSTP)(CircleGraph);
