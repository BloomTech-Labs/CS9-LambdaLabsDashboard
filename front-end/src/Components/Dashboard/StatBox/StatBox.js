import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CircleGraph from '../CircleGraph/CircleGraph';

class StatBox extends PureComponent {
  getCardMembers = ids => {
    const { team } = this.props;
    const { length } = ids;
    const res = [];
    for(let i = 0; i < length; i++) {
      const id = ids[i];
      for(let j = 0; j < team.length; j++) {
        const { name, trelloID } = team[j];
        if(trelloID === id) {
          res.push(name);
          break;
        }
      }
    }
    return res;
  }

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
              const { name, idMembers } = card;
              const members = this.getCardMembers(idMembers)
              const { length } = members;
              return (
                <div 
                  className='card-info'
                  key={name}>
                  <h3>{name}</h3>
                  {
                    length > 0 &&
                    <div>
                      {
                        members.map((user, i) => {
                          return (
                            <h4 
                              key={user}
                              style={{
                                transitionDelay: `${(length/10) + ((i * 5)/100)}s`
                              }}>{user}</h4>
                          )
                        })
                      }
                    </div>
                  }                  
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
  const { error, countUp, totalCards, team } = ExternalApis;
  return { error, countUp, total: totalCards, team };
}

export default connect(mSTP)(StatBox);