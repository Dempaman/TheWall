import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile/Profile.js';
import Wall from './components/Wall/Wall.js';
import SidebarRight from "./components/SidebarRight/SidebarRight.js"
import Header from './components/Header.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="mainCompContainer">
            <Profile />
            <Wall />
            <SidebarRight />
        </div>
      </div>
    );
  }
}

export default App;
