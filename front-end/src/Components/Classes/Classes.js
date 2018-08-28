import React, { Component } from "react";
import { connect } from 'react-redux';
import Axios from 'axios';
import Class from './Class/Class';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete';
import { updateClassPayload } from '../../Actions/Database';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteClasses: 'class-delete',
      currentClass: 'CS9',
      currentID: ''
    };
  }

  openConfirmDelete = (className, id) => {
    this.setState({ 
      currentClass: className, 
      currentID: id,
      deleteClasses: 'class-delete class-delete-show'
    }, () => {
      setTimeout(() => {
        this.setState({
          deleteClasses: 'class-delete class-delete-show class-delete-enter'
        });
      }, 100);
    }); 
  }

  closeConfirmDelete = () => {
    this.setState({ 
      deleteClasses: 'class-delete class-delete-show class-delete-enter class-delete-close' }, () => {
      setTimeout(() => this.setState({ deleteClasses: 'class-delete'}), 500);
    })
  }

  deleteClass = () => {
    const { currentID } = this.state;
    const { userID, updateClassPayload } = this.props; 
    this.setState({
      deleteClasses: 'class-delete class-delete-show class-delete-enter class-delete-loading'
    }, () => {
      Axios.delete(`${baseURL}/classes/${currentID}/${userID}`)
        .then(res => {
          console.log(res);
          if(typeof res.data === 'array') updateClassPayload(res.data);
          this.closeConfirmDelete();
        })
        .catch(err => {
          console.log(err);
          this.closeConfirmDelete();
        });
    });
  }

  render = () => {
    const { deleteClasses, currentClass } = this.state;
    const { classes } = this.props;
    return (
      <div className='classes'>
        <ConfirmDelete 
          classes={deleteClasses}
          currentClass={currentClass}
          closeConfirmDelete={this.closeConfirmDelete}
          deleteClass={this.deleteClass} />
        <div className='center'>
          <h1>Classes</h1>
          <div>
            {
              classes.map((c, i) => {
                const { name, projects, _id } = c;
                return (
                  <Class 
                    key={`${c}-${i}`}
                    name={name}
                    projects={projects}
                    _id={_id}
                    openConfirmDelete={this.openConfirmDelete} />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  };
}

const mSTP = ({ Database, Navigation }) => {
  const { classes } = Database;
  const { userID } = Navigation;
  return { classes, userID };
}

export default connect(mSTP, { updateClassPayload })(Classes);
