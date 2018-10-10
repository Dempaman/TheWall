import React, { Component } from "react";
import "./SidebarRight.css";
import Users from "./Users/Users";
import Groups from "./Groups/Groups";

class SidebarRight extends Component {
    render() {
        return (
            <div className="SidebarRight">
                <Users />
                <Groups />
            </div>
        )
    }
}

export default SidebarRight;