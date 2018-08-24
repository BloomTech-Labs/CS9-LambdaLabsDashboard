import React, { Component } from "react";
import CreateClass from "./CreateClass.js";
import EditClass from "./EditClass.js";
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
