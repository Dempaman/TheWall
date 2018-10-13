import React, { Component } from 'react';
import './Profile.css';

class Friends extends Component {
  constructor(props){
    super(props);
    this.state = {
        userFriends: this.props.userFriends,
    }
  }

  render() {
      const list = this.props.friends.map(data =>
          <div className="sugFriendStl"  key={data._id}>
              <img className="sugProfileImg" src={data.url} alt="Profile" />
              <p>{data.first_name}</p>
              <p>{data.last_name}</p>
          </div>
      )
    return (
        <div>{list}</div>
    )
  }
 }

export default Friends;
