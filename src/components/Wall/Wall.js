import React, { Component } from 'react';
import Status from "./Status.js";
import CreateStatus from "./CreateStatus.js";
import './Wall.css';

class Wall extends Component {
  render() {
    return (
        <div className="wallContainer">
          <CreateStatus />
          <Status />
          <Status />
          <Status />
        </div>

    );
  }
}

export default Wall;
