import React, { Component } from "react";
import "./Users.css";

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {

    }
    
    render() {
        return (
            <div className="onlineUsers">
            </div>
        )
    }
}

export default Users;