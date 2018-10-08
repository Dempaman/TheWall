import React, { Component } from 'react';
import './StatusWallComponent.css';

class StatusWallComponent extends Component {
  render() {
    return (
      <div className="componentContainer">
        <div className="wallContainer">
          <Status />
          <Status />
          <Status />
        </div>
      </div>
    );
  }
}



class Status extends Component {
  render() {
    return (
        <div className="statusContainer">
          <div className="userInfoCard">
            <img className="userImage" src="https://i.imgur.com/LBy4WcJ.jpg" />
            <div className="userNameTime">
              <h4>Oskar Jonsson</h4>
              <p>15:12</p>
            </div>
          </div>
          <div className="statusText">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
    );
  }
}
export default StatusWallComponent;
