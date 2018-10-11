import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile/Profile.js';
import Wall from './components/Wall/Wall.js';
import SidebarRight from "./components/SidebarRight/SidebarRight.js"
import Header from './components/Header.js';

const apiUsersEndpoint = 'http://localhost:4000/api/users'
const apiGroupsEndpoint = "http://localhost:4000/api/groups"
const apiStatusesEndpoint = "http://localhost:4000/api/statuses"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        users: [],
        groups: [],
        statuses: [],
        user: {},
        usersLoaded: false,
        groupsLoaded: false
    }
  }

    componentDidMount() {
        this.fetchUsers()
        this.fetchStatuses()
        this.fetchGroups()
    }

    fetchUsers = () => {
        fetch(apiUsersEndpoint)
        .then(response => response.json())
        .then(data => this.setState({
                users: data,
                user: data[Math.floor(Math.random() * data.length)],
                usersLoaded: true
            })
        )
    }

    fetchGroups = () => {
        fetch(apiGroupsEndpoint)
        .then(res => res.json())
        .then(data => this.setState({ groups: data, groupsLoaded: true }))
    }

    fetchStatuses = () => {
        fetch(apiStatusesEndpoint)
        .then(res => res.json())
        .then(data => this.setState({ statuses: data }))
    }

    refreshGroups = () => {
        this.fetchGroups()
    }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="mainCompContainer">
          <Profile user={this.state.user} users={this.state.users} />
          <Wall />
          { this.state.groupsLoaded 
            ? this.state.usersLoaded 
                ? <SidebarRight refreshGroups={this.refreshGroups} groups={this.state.groups} users={this.state.users} user={this.state.user} /> 
                : null 
            : null 
          }
        </div>
      </div>
    );
  }
}

export default App;
