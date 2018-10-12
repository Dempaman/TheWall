import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile/Profile.js';
import Wall from './components/Wall/Wall.js';
import SidebarRight from "./components/SidebarRight/SidebarRight.js"
import Header from './components/Header.js';

const apiUsersEndpoint = 'http://localhost:4000/api/users'
const apiGroupsEndpoint = "http://localhost:4000/api/groups"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        users: [],
        groups: [],
        user: {},
        userFriends: [],
        usersLoaded: false,
        groupsLoaded: false
    }
  }

    componentDidMount() {
        this.fetchUsers()
        this.fetchGroups()
    }

    fetchUsers = () => {
        fetch(apiUsersEndpoint)
        .then(response => response.json())
        .then(data => this.setState({
            users: data,
            user: data[Math.floor(Math.random() * data.length)],
            usersLoaded: true
        }, () => {
                this.findFriends()
            })
        )
    }

    fetchGroups = () => {
        fetch(apiGroupsEndpoint)
        .then(res => res.json())
        .then(data => this.setState({ groups: data, groupsLoaded: true }))
    }

    refreshGroups = () => {
        this.fetchGroups()
    }

    findFriends(){
        var friendList = []

        for(let i = 0; i < 3; i++){
            let result = this.state.users.find( friend => friend._id === this.state.user.friends[i] );
            friendList.push(result)
        }

        this.setState({userFriends: friendList})
    }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="mainCompContainer">
            { this.state.usersLoaded ? <Profile user={this.state.user} users={this.state.users} userFriends={this.state.userFriends} /> : null }
            { this.state.usersLoaded ? <Wall users={this.state.users}/> : null}
            { this.state.groupsLoaded && this.state.usersLoaded
                ? <SidebarRight refreshGroups={this.refreshGroups} groups={this.state.groups} users={this.state.users} user={this.state.user} />
                : null
            }
        </div>
      </div>
    );
  }
}

export default App;
