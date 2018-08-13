import React from "react";
import "./Settings.css";

export default class Billing extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string
  // };
  // constructor(props) {
  //   super(props);
  //   state = {

  //   }
  // }
  render() {
    return (
      <div>
        <form class="settings">
          <br />
          <label>Email:</label> <input type="text" name="email" />
          <br />
          <label>Old Password:</label> <input type="text" name="oldPw" />
          <br />
          <label>New password:</label> <input type="text" name="lastname" />
          <br />
          <p>
            <button class="styled">Save</button>
          </p>
        </form>
      </div>
    );
  }
}
