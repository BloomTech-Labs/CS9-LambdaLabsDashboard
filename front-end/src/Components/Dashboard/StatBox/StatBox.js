import React, { PureComponent } from 'react';

export default class StatBox extends PureComponent {
  constructor(props) {
    super(props);
  }
  render = () => {
  	const { title, trello, color } = this.props;
  	console.log(trello);
    return (
      <div className='statistic'>
      	<div>
      		<h2 style={{color}}>{title}</h2>
      		{
      			trello.map((card, index) => {
      				const { name, idMembers } = card;
      				return (
      					<div 
      						className='card-info'
      						key={name}>
      						<h3>{name}</h3>
      					</div>
      				);
      			})
      		}
      	</div>
      </div>
    );
  }
}