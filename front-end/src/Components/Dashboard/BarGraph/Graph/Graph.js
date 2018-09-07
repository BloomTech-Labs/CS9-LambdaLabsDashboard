import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import BarContainer from './BarContainer/BarContainer';
import Loader from '../../../Loader/Loader';

class Graph extends PureComponent {
  render = () => {
  	const { team, initBars, maxStat, error } = this.props;
  	const { length } = team;
    return (
      <div className='graph-grid'>
        {
          team.length === 0 && !error &&
          <Loader width={50} />
        }
      	{
          error ? 
            <div className='error'>
              <h3 className='error'>Error!</h3> 
              <p>Please check your project configuration</p>
            </div>
          :
        		team.map((dude, i) => {
        			const { trellos, merges } = dude;
        			return (
        				<BarContainer 
        					key={i}
                  index={i}
        					trellos={trellos}
        					merges={merges}
        					length={length}
                  maxStat={maxStat}
                  initBars={initBars} />
        			);
        		})
      	}
      </div>
    );
  }
}

const mSTP = ({ ExternalApis }) => {
  const { error, initBars, team } = ExternalApis;
  return { error, initBars, team };
}

export default connect(mSTP)(Graph);