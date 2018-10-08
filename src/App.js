import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StatusWallComponent from './components/StatusWallComponent.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <StatusWallComponent />
      </div>
    );
  }
}

export default App;
