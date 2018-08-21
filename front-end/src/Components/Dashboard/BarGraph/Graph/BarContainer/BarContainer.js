import React, { Component } from 'react';

export default class BarContainer extends Component {

	shouldComponentUpdate = ({ maxStat, trellos, merges, initBars, index }) => {
		const curProps = this.props;
		if(maxStat !== curProps.maxStat) return true;
		else if(trellos !== curProps.trellos) return true;
		else if(merges !== curProps.merges) return true;
		else if(initBars !== curProps.initBars) return true;
		else if(index !== curProps.index) return true;
		return false;
	}

  render = () => {
  	const { length, trellos, merges, initBars, index, maxStat } = this.props; 
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
						height: initBars ? ((trellos/maxStat)*100) + "%" : 0,
						transitionDelay
					}}></div>
				<div 
					className='bar bar-git'
					style={{
						height: initBars ? ((merges/maxStat)*100) + "%" : 0,
						transitionDelay
					}}></div>
			</div>
    );
  }
}