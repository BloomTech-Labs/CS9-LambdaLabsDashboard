import React, { Component } from "react";

class Helpers extends Component {
  constructor(x) {
    super();
    this.x = x;
    this.backStudents = [];
  }

  add() {
    if (this.x !== NaN && this.x === undefined)
      return this.backStudents[this.x];
  }

  render() {
    return;
  }
}
export default Helpers;
