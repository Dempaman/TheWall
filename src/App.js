import React, { Component } from 'react';
import './App.css';
import ProfileComp from './components/ProfileComp.js';
import StatusWallComponent from './components/StatusWallComponent.js';
import Header from './components/Header.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="mainCompContainer">
          <ProfileComp />
          <StatusWallComponent />
        </div>
      </div>
    );
  }
}

export default App;
