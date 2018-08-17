import React, { Component } from 'react';

export default class BarContainer extends Component {

  render = () => {
  	const { length, trellos, merges, initBars, index } = this.props; 
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
						height: initBars ? trellos + "0%" : 0,
						transitionDelay
					}}></div>
				<div 
					className='bar bar-git'
					style={{
						height: initBars ? merges + "0%" : 0,
						transitionDelay
					}}></div>
			</div>
    );
  }
}