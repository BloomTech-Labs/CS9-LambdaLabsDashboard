import React, { PureComponent } from 'react';
import CircleGraph from '../CircleGraph/CircleGraph';

export default class StatBox extends PureComponent {
  render = () => {
  	const { 
      title, 
      trello, 
      // error, 
      total, 
      color1, 
      color2,
      gradientID,
      measure,
      countUp
    } = this.props;
    const percentage = (trello.length/total)*100;
    console.log(color1, color2);
    return (
      <div className='statistic'>
      	<div>
      		<div className='title-stat'>
            <div className='indic'>
              <h2 style={{color: color1}}>{title}</h2>
              <div
                className='bar'
                style={{ background: color1 }}></div>
            </div>
            <CircleGraph
              measure={measure}
              gradientID={gradientID}
              color1={color1}
              color2={color2}
              noSubText={true}
              completeness={
                countUp ? 
                  Math.PI * (2 * (200 - ((percentage*200)/100)))
                : Math.PI * (2 * 199) }
              error={false} />
          </div>
          {
            trello.map((card, index) => {
              const { name, idMembers } = card;
              console.log(idMembers);
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