import React, { Component } from "react";
import CreateClass from "./createClass.js";
import EditClass from "./editClass.js";
export default class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      create: false,
      edit: false
    };
  }

  render = () => {
    return (
      <div>
        Classes
        <div />
        <button
          onClick={e => {
            this.setState({ create: !this.state.create });
          }}
        />
        <CreateClass />
        <EditClass />
      </div>
    );
  };
}
