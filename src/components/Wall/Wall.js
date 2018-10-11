import React, { Component } from 'react';
import Status from "./Status.js";
import CreateStatus from "./CreateStatus.js";
import './Wall.css';

const API = 'http://localhost:4000/api/statuses';


class Wall extends Component {
  constructor(props){
    super(props);

    this.state={
      apiStatus: [],
      matchedStatus: []
    }
    this.matchStatusUser = this.matchStatusUser.bind(this);
  }



  componentDidMount() {
    this.fetchStatus();
    //this.logi();
  }

  matchStatusUser(){
    let statusList = [];
    let usersId = this.props.usersId;
    for(let i = 0; i < this.state.apiStatus.length; i++){
      if(this.state.apiStatus[i].author === usersId[i]._id){
        let statusObj = {
          name: `${usersId[i].first_name} ${usersId[i].last_name}`,
          email: usersId[i].email,
          text: this.state.apiStatus[i].text,
          time: this.state.apiStatus[i].timestamp,
          author: this.state.apiStatus[i].author,
          _id: this.state.apiStatus[i]._id,
          image: usersId[i].url
        }
        statusList.push(statusObj);
      }
    }
    this.setState({matchedStatus: statusList})
  }
//db.users.aggregate([{$match: {email: "nellie.johansson@gmail.com"}}])
  /*matchStatusUser(){
    this.state.apiStatus._id
  }*/

  fetchStatus(){
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({
        apiStatus: data
    }, () => {
        this.matchStatusUser();
    })
    )
  }


  render() {
    const list = this.state.matchedStatus.map(data =>
      <div key={data._id} className="statusContainer">
        <div className="userInfoCard">
          <img className="userImage" src={data.image} />
          <div className="userNameTime">
            <h4>{data.name}</h4>
            <p>{data.time}</p>
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
              <button className="postButton" onClick={this.matchStatusUser}>Post</button>
            </div>
          </div>
          {list}

        </div>
    );
  }
}

export default Wall;
