import React, { Component } from 'react';

export default class Input extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	classes: 'input'
	  };
	}

	shouldComponentUpdate = ({ value }, { classes }) => {
		if(value !== this.props.value) return true;
		else if(classes !== this.state.classes) return true;
		return false;
	}

	onFocus = () => {
		this.setState({ classes: 'input input-focus' });
	}

	onBlur = () => {
		if(this.props.value === '') {
			this.setState({ classes: 'input' });
		}
	}

  render = () => {
  	const { labelText, type, placeholder, name, value, onChange, subText, clickSubText } = this.props;
  	const { classes } = this.state;
    return (
      <div className={classes}>
      	<label>{labelText}</label>
      	{subText && <span onClick={clickSubText}>{subText}</span>}
        <input 
        	type={type}
        	placeholder={placeholder}
        	value={value}
        	name={name}
        	onBlur={this.onBlur}
        	onFocus={this.onFocus}
        	onChange={e => onChange(name, e.target.value)} />
      </div>
    );
  }
}