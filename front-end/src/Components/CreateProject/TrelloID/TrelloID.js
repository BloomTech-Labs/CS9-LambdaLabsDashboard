import React, { Component } from 'react';
import Input from '../../Input/Input';

export default class TrelloID extends Component {
  constructor(props) {
    super(props);
    this.state = { trello: '' };
  }

  shouldComponentUpdate({classes}, {trello}) {
  	if(classes !== this.props.classes) return true;
  	else if(trello !== this.state.trello) return true;
  	return false;
  }

  inputChange = (name, value) => {
  	this.setState({[name]: value});
  }

  render = () => {
  	const { trello } = this.state;
  	const { classes, close } = this.props;
    return (
      <div className={classes}>
      	<div>
      		<div>
      			<div>
      				<Input 
	            	labelText='Please enter the link to your Trello board:'
	            	type='text'
	            	placeholder='Your Trello link'
	            	name='trello'
	            	value={trello}
	            	onChange={this.inputChange} />
	            <h3>Select and copy the "id" string in the top left corner</h3>
	            <h4>Omit the quotations as well as the "id":</h4>
	            <div className='buttons'>
	            	<button onClick={close}>Cancel</button>
	            	<button
		            	onClick={() => window.open(`${trello}.json`, '_blank')} 
		            	className='go-trello'>Go!</button>
	            </div>
      			</div>
      		</div>
      	</div>
      </div>
    );
  }
}