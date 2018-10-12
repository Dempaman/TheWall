import React, { Component } from 'react';
import './Wall.css';

const API = 'http://localhost:4000/api/statuses';
const apiStatusEndpoint = "http://localhost:4000/api/status"


class Wall extends Component {
  constructor(props){
    super(props);

    this.state={
      apiStatus: [],
      matchedStatus: [],
      editStatus: 0,
      edit: false,
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

    toggleEdit = data => {
        this.setState({ editStatus: data._id, edit: !this.state.edit })
    }

    deleteStatus = data => {
        fetch("http://localhost:4000/api/status/" + data._id, { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
            this.fetchStatus()
            console.log(data)
        })
    }

    putStatus(){
        fetch(apiStatusEndpoint, {
            method: 'PUT',
            body: JSON.stringify({
                text: 'test2',
                author: "5bbf5bd9adasc390a78",
                timestamp: 'time',
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
                <div className="imageHeader">
                    <img className="userImage" src={data.image} alt="avatar"/>
                    <div className="userNameTime">
                        <h4>{data.name}</h4>
                        <p>{data.time}</p>
                    </div>
                </div>
                <div className="info">
                    <button className="infoDots">...</button>
                    <div className="options">
                        <button onClick={() => this.toggleEdit(data)} >Edit</button>
                        <button onClick={() => this.deleteStatus(data)} >Delete</button>
                    </div>
                </div>
            </div>
            <div className="statusText">
                { this.state.editStatus === data._id && this.state.edit ? <p>Hello</p> : null }
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
              <button onClick={() => this.putStatus()} className="postButton">Post</button>
            </div>
          </div>
          {list}

        </div>
    );
  }
}

export default Wall;
