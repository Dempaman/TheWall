import React, { Component } from 'react';
import Status from "./Status.js";
import CreateStatus from "./CreateStatus.js";
import './Wall.css';

const API = 'http://localhost:4000/api/statuses';
const apiStatusEndpoint = "http://localhost:4000/api/status"


class Wall extends Component {
  constructor(props){
    super(props);

    this.state={
      apiStatus: [],
      matchedStatus: [],
      test: {
          text: 'TEST',
          author: "5bbf5bd95ad147144c390a68",
          timestamp: 'timestamp',
          likes: [],
          comments: [],
      }
    }
    this.matchStatusUser = this.matchStatusUser.bind(this);
  }

  componentDidMount() {
    this.fetchStatus();
  }

  matchStatusUser(){
    let statusList = [];
    let usersId = this.props.usersId;
    let status = this.state.apiStatus;

    for (let i = 0; i < usersId.length; i++ ) {
      for ( let e = 0; e < status.length; e++ ) {
        if ( usersId[i]._id === status[e].author ){
          let statusObj = {
            name: `${usersId[i].first_name} ${usersId[i].last_name}`,
            email: usersId[i].email,
            text: status[e].text,
            time: status[e].timestamp,
            author: status[e].author,
            _id: status[e]._id,
            image: usersId[i].url
          }
          statusList.push(statusObj);
        }
      }
    }
    //Sorterar statuses på frontend i fallande ordning på tid
    statusList.sort(function(a,b){
        return new Date(b.time) - new Date(a.time);
    });
    this.setState({matchedStatus: statusList})
  }

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

    putStatus(x){
        fetch(apiStatusEndpoint, {
            method: 'PUT',
            body: JSON.stringify({
                text: 'TEST',
                author: "5bbf5bd95ad147144c390a68",
                timestamp: 'timestamp',
                likes: [],
                comments: [],
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }


  render() {
    console.log(this.state.matchedStatus);
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
              <button onClick={() => this.putStatus()} className="postButton">Post</button>
            </div>
          </div>
          {list}

        </div>
    );
  }
}

export default Wall;
