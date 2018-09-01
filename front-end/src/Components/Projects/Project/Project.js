import React, { PureComponent } from 'react';
import Loader from '../../Loader/Loader';

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

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ classes: 'project project-show' });
    }, 250);
  }

  componentWillUnmount = () => {
    this.setState({ classes: 'project' });
  }

  navigate = (name, github, trello) => {
    this.props.history.push({ 
      pathname: `/project/${name.replace(/\s+/g, '-').toLowerCase()}`, 
      state: { github, trello, name },
    });
  }

  navigate = () => {
    const { github, trello, history, name } = this.props;
    history.push(`/project/${trello}/${github}/${name}`);
  }

  render = () => {
    const { classes, trans } = this.state;
  	const { index, name, students, color1, color2, loader, openConfirmDelete, id } = this.props;
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
          <button 
            //onClick={this.flip}
            className='edit'></button>
          <button
            onClick={() => openConfirmDelete(name, id)} 
            className='delete'></button>
          <div className='center'>
            <h2 onClick={this.navigate}>{name}</h2>
            {
              students.length > 0 &&
              students.map(student => {
                const { fullName } = student;
                return fullName !== 'Boomer' && fullName !== 'Brian Doyle' ? (
                  <div 
                    key={fullName}
                    className='student'>
                    <h3>{fullName}</h3>
                  </div>
                ) : null
              })
            }
            {
              loader && <Loader dimensions={40} />
            }
            {
              students.length === 0 && !loader &&
              <p>{`Could not find any students working on ${name}`}</p>
            }
          </div>
        </div>
      </div>
    );
  }
}
