import React, { PureComponent } from 'react';

export default class Project extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      classes: 'project',
      trans: true,
      newName: '',
      error: false,
    };
  }

  flip = () => {
    this.setState(ps => {
      return {
        trans: false,
        classes: ps.classes === 'class' ? 'class class-flip' : 'class'
      }
    })
  }

  render = () => {
    const { classes, trans } = this.state;
  	const { index, name, students, color1, color2 } = this.props;
    return (
      <div 
        className={classes}
        style={{transitionDelay: trans ? `${index*70}ms` : '0s'}} >
      	<div className='front'>
          <div 
            className='top-border' 
            style={{
              background: `linear-gradient(to right, ${color1}, ${color2})`
            }}/>
          <div className='center'>
            <h2>{name}</h2>
            {
              students.length > 0 ?
              students.map(student => {
                return (
                  <div 
                    key={student}
                    className='student'>
                    <h3>{student}</h3>
                  </div>
                );
              })
              : <p>{`Could not find any students working on ${name}`}</p>
            }
          </div>
        </div>
      </div>
    );
  }
}
