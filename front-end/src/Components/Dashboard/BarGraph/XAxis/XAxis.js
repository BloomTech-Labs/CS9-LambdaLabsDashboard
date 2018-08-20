import React, { PureComponent } from 'react';

export default class XAxis extends PureComponent {
  render = () => {
  	const { team } = this.props;
  	const { length } = team;
    return (
      <div 
        className='contributors'
        style={{
          marginLeft: 30 - (length - 1) + 'px'
        }}>
        {
          team.map((dude, i) => {
            const { name } = dude;
            const [ first, last ] = name.split(" ");
            return (
              <div 
                key={i}
                className='contributor'
                data-name={`${first} ${last}`}
                style={{
                  width: 100/length + '%'
                }}>
                <h5 style={{
                  // marginLeft: -(300/length) + '%'
                }}>{`${first[0]}.${last[0]}.`}</h5>
              </div>
            );
          })
        }
      </div>
    );
  }
}