import React, { Component } from 'react';

export default class BaseCircle extends Component {
  
	shouldComponentUpdate = () => false;

  render = () => {
    return (
      <circle
				stroke="#19202D"
				strokeWidth="20" 
				fill='transparent' 
				cx="250" 
				cy="250" 
				r="200"
				strokeLinecap="round" />
    );
  }
}