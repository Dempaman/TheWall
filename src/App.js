import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile/Profile.js';
import Wall from './components/Wall/Wall.js';
import Users from "./components/Users/Users.js";
import Header from './components/Header.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="mainCompContainer">
          <Profile />
          <Wall />
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
