import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile/Profile.js';
import Wall from './components/Wall/Wall.js';
import SidebarRight from "./components/SidebarRight/SidebarRight.js"
import Header from './components/Header.js';

const APIDATA = 'http://localhost:4000/api/users'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiData: [],
      randomProfile: [],
    }
  }

  componentDidMount() {
    this.fetchUsersFunction();
  }

  //Data från http://localhost:4000/api/users
  fetchUsersFunction(){
    fetch(APIDATA)
    .then(response => response.json())
    .then(data => this.setState(
      {
        apiData: data,
        randomProfile: data[Math.floor(Math.random() * data.length)]
      })
    )
  }



  render() {
    return (
      <div className="app">
        <Header />
        <div className="mainCompContainer">
          <Profile
            apiData={this.state.apiData}
            randomProfile={this.state.randomProfile}
          />

          {this.state.apiData.length > 0 ? <Wall usersId={this.state.apiData}/> : null}
          <SidebarRight />
        </div>
      </div>
    );
  }
}

export default App;
