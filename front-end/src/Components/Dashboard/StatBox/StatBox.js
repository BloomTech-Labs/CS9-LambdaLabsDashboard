import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CircleGraph from '../CircleGraph/CircleGraph';

class StatBox extends PureComponent {
  render = () => {
  	const { 
      title, 
      trello, 
      total, 
      color1, 
      color2,
      gradientID,
      measure,
      countUp,
      error,
    } = this.props;
    const percentage = (trello.length/total)*100;
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
              error={error} />
          </div>
          {
            trello.length > 0 ? 
            trello.map((card, index) => {
              const { name } = card;
              return (
                <div 
                  className='card-info'
                  key={name}>
                  <h3>{name}</h3>
                </div>
              );
            }) 
            : countUp &&
            <h3 style={{ 
              color: color1, 
              textAlign: 'center' 
            }}>{`There are no items ${title}`}</h3>
          }
      	</div>
      </div>
    );
  }
}

const mSTP = ({ ExternalApis }) => {
  const { error, countUp, totalCards } = ExternalApis;
  return { error, countUp, total: totalCards };
}

export default connect(mSTP)(StatBox);