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

  componentWillUnmount = () => this.setState({ classes: 'project' });

  navigate = (e, edit=false) => {
    const { id, github, trelloID, trelloURL, history, name, className } = this.props;
    if(edit) history.push({ pathname: `/editProject/${id}`, state: { edit: true, className, github, trelloURL, name }});
    else history.push(`/project/${trelloID}/${github}/${name}`);
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
            onClick={e => this.navigate(e, true)}
            className='edit'></button>
          <button
            onClick={() => openConfirmDelete(name, id)} 
            className='delete'></button>
          <div className='center'>
            <h2 onClick={e => this.navigate(e)}>{name}</h2>
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
