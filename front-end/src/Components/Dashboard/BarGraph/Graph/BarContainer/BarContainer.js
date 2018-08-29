import React, { Component } from 'react';

export default class BarContainer extends Component {
	constructor(props) {
	  super(props);
	  this.state = { animate: false };
	}

	componentDidMount = () => this.setState({ animate: true });

	shouldComponentUpdate = ({maxStat, trellos, merges, initBars, index}, {animate}) => {
		const curProps = this.props;
		if(maxStat !== curProps.maxStat) return true;
		else if(trellos !== curProps.trellos) return true;
		else if(merges !== curProps.merges) return true;
		else if(initBars !== curProps.initBars) return true;
		else if(index !== curProps.index) return true;
		else if(animate !== this.state.animate) return true;
		return false;
	}

	componentWillUnmount = () => this.setState({ animate: false });

  render = () => {
  	const { length, trellos, merges, initBars, index, maxStat } = this.props; 
  	const { animate } = this.state;
  	const transitionDelay = index/15 + 's';
    return (
      <div 
				className='bar-container'
				style={{
					width: 100/length + '%'
				}}>
				<div 
					className='bar bar-trello'
					style={{
						height: initBars && animate ? ((trellos/maxStat)*100) + "%" : 0,
						transitionDelay
					}}></div>
				<div 
					className='bar bar-git'
					style={{
						height: initBars && animate ? ((merges/maxStat)*100) + "%" : 0,
						transitionDelay
					}}></div>
			</div>
    );
  }
}