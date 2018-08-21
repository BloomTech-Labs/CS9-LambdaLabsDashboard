import React, { Component } from 'react';

export default class TopCircle extends Component {

	shouldComponentUpdate = ({completeness}) => {
		if(completeness !== this.props.completeness) return true;
		return false;
	}

  render = () => {
  	const { stroke, completeness } = this.props;
    return (
      <circle
				stroke={stroke}
				strokeWidth="20" 
				fill='transparent' 
				cx="250" 
				cy="250" 
				r="200"
				strokeLinecap="round"
				style={{
					strokeDasharray: Math.PI * (2 * 200),
					strokeDashoffset: completeness
				}} />
    );
  }
}