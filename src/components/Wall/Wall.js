import React, { Component } from 'react';
import './Wall.css';

const API = 'http://localhost:4000/api/statuses';


class Wall extends Component {
    constructor(props){
        super(props);

        this.state={
            apiStatus: [],
            matchedStatus: [],
            editStatus: 0,
            edit: false,
            text: ""
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
                    let status = {
                        name: `${users[i].first_name} ${users[i].last_name}`,
                        email: users[i].email,
                        text: statuses[e].text,
                        time: statuses[e].timestamp,
                        author: statuses[e].author,
                        _id: statuses[e]._id,
                        image: users[i].url
                    }

                    statusList.push(status);
                }
            }
        }

        this.setState({matchedStatus: statusList})
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

    handleChange = event => {
        this.setState({ text: event.target.value }, () => console.log(this.state.text))
    }

    commitChange = data => {
        let newData = { ...data, text: this.state.text }

        //fetch(API,)
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
                        <div className="options">
                            <button onClick={() => this.enableEdit(data)}>Edit</button>
                            <button onClick={() => this.deleteStatus(data)}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="statusText">
                    { this.state.editStatus === data._id && this.state.edit 
                        ?   <React.Fragment>
                                <input type="text" value={this.state.text} onChange={this.handleChange} />
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
