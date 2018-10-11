import React, { Component } from 'react';
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


  render() {
    const list = this.state.matchedStatus.map(data =>
        <div key={data._id} className="statusContainer">
            <div className="userInfoCard">
                <div className="imageHeader">
                    <img className="userImage" src={data.image} alt="avatar"/>
                    <div className="userNameTime">
                        <h4>{data.name}</h4>
                        <p>{data.time}</p>
                    </div>
                </div>
                <div className="info">
                    <button className="infoDots">...</button>
                    <div className="options hidden">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
            <div className="statusText">
                <p>
                    {data.text}
                </p>
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
              <button className="postButton">Post</button>
            </div>
          </div>
          {list}

        </div>
    );
  }
}

export default Wall;
