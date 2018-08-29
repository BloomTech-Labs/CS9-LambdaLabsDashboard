import React, { PureComponent } from 'react';

export default class CircleDetails extends PureComponent {
  render = () => {
  	const { trello, countUp } = this.props;
    return (
      <div className='circle-details'>
      	<div className='stat-wrapper'>
    			<div style={{borderTop: '3px solid #FC4645'}}>
    				<h5 style={{
    					color: '#FC4645',
    					opacity: countUp ? 1 : 0,
    					transform: countUp ? 'scale(1)' : 'scale(0.75)'
    				}}>{countUp ? trello['To Do'].cards.length : 0}</h5>
    				<h5>Pending</h5>
    			</div>
    			<div style={{borderTop: '3px solid #65AAFF'}}>
    				<h5 style={{
    					color: '#65AAFF',
    					opacity: countUp ? 1 : 0,
    					transform: countUp ? 'scale(1)' : 'scale(0.75)'
    				}}>{countUp ? trello['In Progress'].cards.length + trello['Testing'].cards.length : 0}</h5>
    				<h5>In Progress</h5>
    			</div>
    			<div style={{borderTop: '3px solid #35FA7E'}}>
    				<h5 style={{
    					color: '#35FA7E',
    					opacity: countUp ? 1 : 0,
    					transform: countUp ? 'scale(1)' : 'scale(0.75)'
    				}}>{countUp ? trello['Done'].cards.length : 0}</h5>
    				<h5>Completed</h5>
    			</div>
    		</div>
      </div>
    );
  }
}