import React, { Component } from "react";
import CreateClass from "./createClass.js";
import EditClass from "./editClass.js";
export default class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: []
    };
  }

  render = () => {
    return (
      <div>
        Classes
        <CreateClass />
        <EditClass />
      </div>
    );
  };
}
