import React, { PureComponent } from 'react';
import CircleGraph from '../../../Dashboard/CircleGraph/CircleGraph';
import { generateColors } from '../../../../Helpers/Arrays';

export default class ClassProject extends PureComponent {

	navigate = () => {
		const { history, name, trello, github } = this.props;
    history.push(`/project/${trello}/${github}/${name}`);
  }

  render = () => {
  	const { name, index, length, completeness } = this.props;
  	const { color1, color2 } = generateColors(index, length);
    return (
      <div 
        className='class-project'
        onClick={this.navigate}
        style={{
        	marginBottom: index === length - 1 ? '35px' : 'auth'
        }}>
        	<h4>{name}</h4>
        	<CircleGraph
        		dimensions={40}
            measure={completeness}
            gradientID={`${color1}${color2}`}
            dataLength={100}
            color1={color2}
            color2={color1}
            noSubText={true}
            completeness={
              true ? 
                Math.PI * (2 * (200 - ((completeness*200)/100)))
              : Math.PI * (2 * 199) }
            error={false} />
        </div>
    );
  }
}