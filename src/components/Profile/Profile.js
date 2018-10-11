import React, { Component } from 'react';
import arrowUp from './icons8-chevron-up-26.png';
import arrowDown from './icons8-chevron-down-26.png';
import './Profile.css';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
        user: this.props.user,
        userFriends: this.props.userFriends,
        show: true
    }
  }

  toggleDiv() {
    this.setState({ show: !this.state.show })
  }

  render() {

  const list = this.props.userFriends.map(data =>
      <div className="sugFriendStl"  key={data._id}>
        <img className="sugProfileImg" src={data.url} alt="Profile" />
        <p>{data.first_name}</p>
        <p>{data.last_name}</p>
      </div>

  )

    return (
      <div className="mainProfileContainer">
        <div>
          <div className="profileDiv" key={this.props.user._id}>
            <img className="profileImg" src={this.props.user.url} alt="Profile" />
            <p className="profileNameStl">{this.props.user.first_name}</p>
            <p className="profileEmailStl">{this.props.user.email}</p>
          </div>
        </div>
        <div className="editProfileButtonDiv">
          <button className="editProfileButton">Edit Profile</button>
        </div>
        <div>
          <div className="sugFriendContainer">
            <div className="SugParagrafText">
              <p>Online Friends</p>
              <img onClick={() => this.toggleDiv()} src={this.state.show ? arrowDown : arrowUp} alt="arrow"/>
            </div>
            <div className="sugInnerFriendContainer">
              {this.state.show ? <div>{list}</div> :false}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
