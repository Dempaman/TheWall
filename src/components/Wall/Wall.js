import React, { Component } from 'react';
import './Wall.css';

const API = 'http://localhost:4000/api/statuses';


class Wall extends Component {
    constructor(props){
        super(props);

        this.state={
            user: this.props.user,
            apiStatus: [],
            matchedStatus: [],
            editStatus: 0,
            edit: false,
            text: "",
            textArea: "",
        }
    }

    componentDidMount() {
        this.fetchStatuses();
    }

    matchStatusUser = () => {
        let statusList = [];
        let users = this.props.users;
        let statuses = this.state.apiStatus;

        // For every user
        for (let i = 0; i < users.length; i++ ) {
            // For every user, for every status
            for (let e = 0; e < statuses.length; e++) {
                // If the user is the author of a status
                if (users[i]._id === statuses[e].author){
                    // Add User name + Lastname + Email + Avatar etc to the status

                    let convTime = Date.parse(statuses[e].timestamp) //Converts the timesamp in statuses to "unix timestamp"
                    let compare = new Date(Date.now()- convTime) //Compares the time when it was posted with todays date/time

                    let status = {
                        name: `${users[i].first_name} ${users[i].last_name}`,
                        email: users[i].email,
                        text: statuses[e].text,
                        time: statuses[e].timestamp,
                        author: statuses[e].author,
                        timeAgo: timeSince(new Date(Date.now() - compare)),
                        _id: statuses[e]._id,
                        image: users[i].url
                    }
                    //Func that tells how long ago status was posted
                    function timeSince(date) {

                      var seconds = Math.floor((new Date() - date) / 1000);

                      var interval = Math.floor(seconds / 31536000);

                      if (interval >= 1) {
                        return interval + " years ago";
                      }
                      interval = Math.floor(seconds / 2592000);
                      if (interval >= 1) {
                        return interval + " months ago";
                      }
                      interval = Math.floor(seconds / 86400);
                      if (interval >= 1) {
                        return interval + " days ago";
                      }
                      interval = Math.floor(seconds / 3600);
                      if (interval >= 1) {
                        return interval + " h ago";
                      }
                      interval = Math.floor(seconds / 60);
                      if (interval >= 1) {
                        return interval + " min ago";
                      }
                      return " just now";
                    }
                    statusList.push(status);
                }
            }
        }
        this.setState(
            {
                matchedStatus: statusList.sort(function(a,b){
                    return new Date(b.time) - new Date(a.time);
                })
            }
        )
    }


    fetchStatuses(){
        fetch(API)
        .then(response => response.json())
        .then(data => this.setState({
            apiStatus: data
        }, () => {
                this.matchStatusUser();
            })
        )
    }

    enableEdit = data => {
        this.setState({ editStatus: data._id, edit: true, text: data.text })
    }

    disableEdit = () => {
        this.setState({ editStatus: 0, edit: false, text: "" })
    }

    deleteStatus = data => {
        fetch("http://localhost:4000/api/status/" + data._id, { method: "DELETE" })
        .then(res => res.json())
        .then(msg => {
            this.fetchStatuses()
            console.log(msg)
        })
    }

    handleInputChange = event => {
        this.setState({ text: event.target.value })
    }

    handleTextAreaChange = event => {
        this.setState({ textArea: event.target.value})
    }

    commitChange = data => {
        let newData = { ...data, text: this.state.text }

        //fetch(API,)
    }

    putStatus = () => {
        fetch("http://localhost:4000/api/status?text=" + this.state.textArea + "&author=" + this.state.user._id, { method: "PUT" })
        .then(res => res.json())
        .then( data => {
            this.fetchStatuses()
            console.log(data)
        })

        /*fetch("http://localhost:4000/api/status", {
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
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));*/
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
                            <p>{data.timeAgo}</p>
                        </div>
                    </div>
                    <div className="info">
                        <button className="infoDots">...</button>
                        <div className="options">
                            <button onClick={() => this.enableEdit(data)}>Edit</button>
                            <button onClick={() => this.deleteStatus(data)}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="statusText">
                    { this.state.editStatus === data._id && this.state.edit
                        ?   <React.Fragment>
                                <input type="text" value={this.state.text} onChange={this.handleInputChange} />
                                <button onClick={() => this.commitChange(data)}>Save</button>
                                <button onClick={this.disableEdit}>Discard</button>
                            </React.Fragment>
                        : <p>{data.text}</p>
                    }
                </div>
            </div>
        );
        return (
            <div className="wallContainer">
                <div className="createStatusContainer">
                <div className="optionCreate"><p>Status</p></div>
                <textarea className="textAreaStatus" placeholder="What's up?" value={this.state.textArea} onChange={this.handleTextAreaChange} />
                <div className="postButtonContainer">
                    <button className="settingsButton">Settings</button>
                    <button onClick={this.putStatus} className="postButton">Post</button>
                </div>
                </div>
                {list}

            </div>
        );
    }
}

export default Wall;
