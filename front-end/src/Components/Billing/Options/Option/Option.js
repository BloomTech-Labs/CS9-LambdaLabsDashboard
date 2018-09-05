import React, { Component } from 'react';

export default class Options extends Component {

	shouldComponentUpdate = () => false;

  render = () => {
  	const { price, title, list, select } = this.props;
    return (
      <div className='option'>
				<div className='price'>
					<div className='circle'>
						<h3>{price}</h3>
					</div>
				</div>
				<div className='center'>
					<h2>{title}</h2>
					<div className='desc'>
						<ul>
							{
								list.map((item, i) => {
									return <li key={item}>{item}</li>
								})
							}
						</ul>
					</div>
					<button onClick={() => select(price, title)}>Subscribe</button>
				</div>
			</div>
    );
  }
}