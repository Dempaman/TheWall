import React, { Component } from 'react';
import Status from "./Status.js";
import CreateStatus from "./CreateStatus.js";
import './Wall.css';

const API = 'http://localhost:4000/api/statuses';


class Wall extends Component {
  constructor(props){
    super(props);

    this.state={
      apiDataStatus: []
    }
    this.logi = this.logi.bind(this);
  }



  componentDidMount() {
    this.fetchStatus();
  }

  logi(){
    console.log(this.state.apiData)
  }

  fetchStatus(){
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({
        apiData: data
      })
    )
  }




  render() {
    const list = this.state.apiData.map(data =>
      <div key={data._id} className="statusContainer">
        <div className="userInfoCard">
          <img className="userImage" src="https://i.imgur.com/LBy4WcJ.jpg" />
          <div className="userNameTime">
            <h4>Robert Beck</h4>
            <p>{data.timestamp}</p>
          </div>
        </div>
        <div className="statusText">
          <p>{data.text}</p>
        </div>
      </div>
    );
    return (
        <div className="wallContainer">
          <div className="createStatusContainer">
            <div className="optionCreate"><p>Status</p></div>
            <textarea className="textAreaStatus" placeholder="What's up?"/>
            <div className="postButtonContainer">
              <button className="settingsButton">Settings</button>
              <button className="postButton" onClick={this.logi}>Postlkl</button>
            </div>
          </div>

        {list}
        </div>
    );
  }
}

export default Wall;
