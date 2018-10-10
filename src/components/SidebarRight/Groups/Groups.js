import React, { Component } from "react";
import "./Groups.css";

class Groups extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groups: []
        }
    }

    fetchGroups() {
        fetch("http://localhost:4000/api/groups/")
        .then( res => res.json())
        .then( data => {
            this.setState({ groups: data }, () => console.log(this.state))
        })
    }

    componentDidMount() {
        this.fetchGroups()
    }

    joinGroup(groupId, userId) {

    }

    leaveGroup(groupId, userId) {

    }
    
    render() {
        return (
            <div className="onlineGroups">
                <div className="title">
                    <h3>All Groups</h3>
                </div>
                <ul>
                    { this.state.groups.map( group => {
                        return (
                            <li key={group._id}>
                                <div className="left">
                                    <p>{ group.name }</p>
                                    <button><p>Join</p></button>
                                </div>
                                <div className="right">
                                    <p>{ group.description }</p>
                                    <div className="memberSelection">
                                        <img src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar" />
                                        <img src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar" />
                                        <img src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar" />
                                        <img src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar" />
                                        <img src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar" />
                                        <img src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar" />
                                        <img src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar" />
                                        <img src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar" />
                                        <img src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar" />
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Groups;