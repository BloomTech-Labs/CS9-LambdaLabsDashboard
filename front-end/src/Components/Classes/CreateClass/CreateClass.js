import React, { Component } from "react";
import Input from "../../Input/Input";
import CheckIcon from "../../../pictures/check.svg";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class CreateClass extends Component {
  shouldComponentUpdate = ({ classes, className, error }) => {
    if (classes !== this.props.classes) return true;
    else if (className !== this.props.className) return true;
    else if (error !== this.props.error) return true;
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
      closeCreateClass
    } = this.props;
    console.log("===>length", length);
    return (
      <div className={classes}>
        <div>
          {5 - this.props.length > 0 && (
            <div>
              <div className="title-input">
                <h2>Create a class</h2>
                {error && (
                  <p>{`There is already a class with the name ${className}`}</p>
                )}
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
          )}
          {this.props.length >= 5 && (
            <div>
              <div className="title-input">
                <h2>
                  You did pass the maximum of 5 free classes please click bellow
                  to go to the payment page{" "}
                </h2>
              </div>
              <div className="buttons">
                <button
                  onClick={() => {
                    this.props.history.push("/billing");
                  }}
                >
                  payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
}
const mSTP = state => {
  console.log("st===>", state.chargeReducer);
  return { paid: state.chargeReducer };
};

export default connect(mSTP)(withRouter(CreateClass));
