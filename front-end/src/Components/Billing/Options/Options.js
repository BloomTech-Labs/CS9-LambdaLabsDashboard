import React, { Component } from 'react';
import Option from './Option/Option';

export default class Options extends Component {

  shouldComponentUpdate = () => false;

  render = () => {
    const { select } = this.props; 
    return (
      <div className='options'>
      	<div>
      		<Option 
      			price="$9.99"
      			title="Monthly"
      			list={[
      				"Low monthly payments",
      				"Full features",
      				"No creation limits",
      				"24 hour support available"
      			]}
            stripePrice={999}
            select={select} />
      		<Option 
      			price="$99.99"
      			title="Yearly"
      			list={[
      				"Discounted membership",
      				"Full features",
      				"No creation limits",
      				"24 hour support available"
      			]}
            stripePrice={9999}
            select={select} />
      	</div>
      </div>
    );
  }
}