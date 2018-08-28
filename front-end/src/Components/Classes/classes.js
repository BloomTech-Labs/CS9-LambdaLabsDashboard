import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import Axios from 'axios';
import Class from './Class/Class';
import CreateClass from './CreateClass/CreateClass';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete';
import Loader from '../Loader/Loader';
import { updateClassPayload } from '../../Actions/Database';
import { generateColors } from '../../Helpers/Arrays';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

class Classes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      containerClasses: 'classes',
      deleteClasses: 'class-delete',
      createClasses: 'class-create',
      currentClass: 'CS9',
      currentID: '',
      loader: true,
      newClassName: '',
      newClassError: false
    };
  }

  componentDidMount = () => {
    const { userID, updateClassPayload } = this.props; 
    Axios.get(`${baseURL}/classes/${userID}`)
      .then(res => {
        console.log(res.data);
        if(typeof res.data !== 'string') {
          updateClassPayload(res.data.classes);
          this.enter();
        }
      });
  }

  enter = () => this.setState({ containerClasses: 'classes classes-show', loader: false });

  openConfirmDelete = (className, id) => {
    this.setState({ 
      currentClass: className, 
      currentID: id,
      deleteClasses: 'class-delete class-modal-show'
    }, () => {
      setTimeout(() => {
        this.setState({
          deleteClasses: 'class-delete class-modal-show class-modal-enter'
        });
      }, 100);
    }); 
  }

  openCreateClass = () => {
    this.setState({ createClasses: 'class-create class-modal-show' }, () => {
      setTimeout(() => {
        this.setState({
          createClasses: 'class-create class-modal-show class-modal-enter'
        });
      }, 100);
    });
  }

  closeConfirmDelete = () => {
    this.setState({ 
      deleteClasses: 'class-delete class-modal-show class-modal-enter class-modal-close' }, () => {
      setTimeout(() => this.setState({ deleteClasses: 'class-delete'}), 500);
    })
  }

  closeCreateClass = () => {
    this.setState({ 
      createClasses: 'class-create class-modal-show class-modal-enter class-modal-close' }, () => {
      setTimeout(() => this.setState({ createClasses: 'class-create', newClassName: '', newClassError: false }), 500);
    })
  }

  createClass = () => {
    const { newClassName } = this.state;
    const { userID } = this.props;
    if(newClassName.length > 2) {
      this.setState({
      createClasses: 'class-create class-modal-show class-modal-enter class-modal-loading'
      }, () => {
        Axios.post(`${baseURL}/classes`, { className: newClassName, userID })
          .then(res => this.UIAction('createClasses', res))
          .catch(err => this.setState({ newClassError: true }));
      });
    }
  }

  deleteClass = () => {
    const { currentID } = this.state;
    const { userID } = this.props; 
    this.setState({
      deleteClasses: 'class-delete class-modal-show class-modal-enter class-modal-loading'
    }, () => {
      Axios.delete(`${baseURL}/classes/${currentID}/${userID}`)
        .then(res => this.UIAction('deleteClasses', res))
        .catch(err => this.closeConfirmDelete());
    });
  }

  inputChange = (name, value) => {
    this.setState({ newClassName: value });
  }

  UIAction = (el, res) => {
    setTimeout(() => {
      if(typeof res.data !== 'string') {
        this.setState({[el]: `${el === 'deleteClasses' ? 'class-delete' : 'class-create'} class-modal-show class-modal-enter class-modal-loading class-modal-complete`}, () => {
          this.props.updateClassPayload(res.data.classes)
          setTimeout(() => this.closeUIAction(el), 500);
        });
      } else {
        if(el === 'deleteClasses') this.closeUIAction(el);
        else this.setState({ createClasses: 'class-create class-modal-show class-modal-enter', newClassError: true });
      }
    }, 500);
  }

  closeUIAction = el => {
    if(el === 'deleteClasses') this.closeConfirmDelete();
    else this.closeCreateClass();
  }

  render = () => {
    const { deleteClasses, createClasses, currentClass, containerClasses, loader, newClassName, newClassError } = this.state;
    const { classes, userID } = this.props;
    const { length } = classes;
    return (
      <div className={containerClasses}>
        <ConfirmDelete 
          classes={deleteClasses}
          currentClass={currentClass}
          closeConfirmDelete={this.closeConfirmDelete}
          deleteClass={this.deleteClass} />
        <CreateClass 
          classes={createClasses}
          userID={userID}
          className={newClassName}
          error={newClassError}
          createClass={this.createClass}
          closeCreateClass={this.closeCreateClass}
          inputChange={this.inputChange} />
        <button 
          className='create-class'
          onClick={this.openCreateClass}></button>
        <div className='center'>
          <h1>Classes</h1>
          {
            loader && <Loader dimensions={75} />
          }
          <div>
            {
              length > 0 ? 
              classes.map((c, i) => {
                const { className, projects, _id } = c;
                const { color1, color2 } = generateColors(i, length); 
                return (
                  <Class 
                    key={`${c}-${i}`}
                    index={i}
                    name={className}
                    projects={projects}
                    _id={_id}
                    userID={userID}
                    color1={color1}
                    color2={color2}
                    openConfirmDelete={this.openConfirmDelete} />
                );
              })
              :
              <h2>Create a class to begin tracking your team's progress</h2>
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
