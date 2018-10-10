import React, { Component } from "react";
import "./Groups.css";

class Groups extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }
    
    render() {
        return (
            <div className="onlineGroups">
                <div className="title">
                    <h3>All Groups</h3>
                    <p>Members</p>
                </div>
                <ul>
                    <li>
                        <div className="info">
                            <div className="left">
                                We who love Kent
                            </div>
                            <div className="right">
                                20
                            </div>
                        </div>
                        <div className="buttons">
                            <button>Join Group</button>
                            <button>Info</button>
                        </div>
                    </li>
                    <li>
                        <div className="info">
                            <div className="left">
                                Hasses Angels
                            </div>
                            <div className="right">
                                300
                            </div>
                        </div>
                        <div className="buttons">
                            <button>Join Group</button>
                            <button>Info</button>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Groups;