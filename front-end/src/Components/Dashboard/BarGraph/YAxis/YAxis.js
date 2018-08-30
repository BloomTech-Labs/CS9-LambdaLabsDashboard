import React, { Component } from 'react';

export default class YAxis extends Component {

	shouldComponentUpdate = ({ maxStat }) => {
		if(maxStat !== this.props.maxStat) return true;
		return false;
	}

  render = () => {
  	const { maxStat } = this.props; 
    console.log(maxStat);
    return (
      <div className='y-axis'>
        {
          [0,1,2,3,4,5,6,7,8,9].map(stat => {
            if(stat % 2 === 0) {
              return (
                <div 
                  key={stat}
                  data-stat={maxStat - ((maxStat/10)*stat)}
                  className='y-axis-tick'></div>
              );
            }
            return (
              <div 
                key={stat}
                data-stat=""
                className='y-axis-tick'></div>
            );
          })
        }
      </div>
    );
  }
}