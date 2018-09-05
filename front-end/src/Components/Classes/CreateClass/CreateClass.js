import React, { Component } from "react";
import Input from "../../Input/Input";
import CheckIcon from "../../../pictures/check.svg";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class CreateClass extends Component {

  shouldComponentUpdate = ({ classes, className, error }) => {
    const curProps = this.props;
    if (classes !== curProps.classes) return true;
    else if (className !== curProps.className) return true;
    else if (error !== curProps.error) return true;
    return false;
  };

  render = () => {
    const {
      classes,
      createClass,
      className,
      length,
      error,
      inputChange,
      closeCreateClass,
      subscribed,
      history,
    } = this.props;
    return (
      <div className={classes}>
        <div>
          {
            5 - length > 0 || subscribed ?
            <div>
              <div className="title-input">
                <h2>Create a class</h2>
                {
                  error &&
                  <p>{`There is already a class with the name ${className}`}</p>
                }
                <Input
                  labelText="What would you like to name this class?"
                  type="text"
                  placeholder="Ex: Computer Science I"
                  name="className"
                  value={className}
                  onChange={inputChange}
                />
              </div>
              <div className="buttons">
                <button onClick={closeCreateClass}>Cancel</button>
                <button onClick={() => createClass(className)}>
                  Create
                  <img src={CheckIcon} alt="delete class" />
                </button>
              </div>
            </div>
            :
            <div>
              <div className="title-input">
                <h2>
                  You've reached the maximum number of free classes you can create. Please subscribe to remove creation limits.
                </h2>
              </div>
              <div className="buttons">
                <button 
                  onClick={() => history.push("/billing")}>
                  payment
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  };
}
const mSTP = ({ Database }) => {
  const { subscribed } = Database;
  return { subscribed };
};

export default connect(mSTP)(withRouter(CreateClass));
