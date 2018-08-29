import React, { Component } from 'react';

export default class Loader extends Component {
	
	shouldComponentUpdate = () => false;

  render = () => {
  	const { dimensions } = this.props;
    return (
      <div className="load">
		    <div>
		      <div 
		      	className="showbox">
		        <div 
		        	className="loader"
		        	style={{width: dimensions}}>
		          <svg className="circular" viewBox="25 25 50 50">
		            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
		          </svg>
		        </div>
		      </div>
		    </div>
		  </div>
    );
  }
}