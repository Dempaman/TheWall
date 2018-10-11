import React, { Component } from 'react';
import './Profile.css';
import profilePicture2 from '../../images/LBy4WcJ.jpg';
import profilePicture3 from '../../images/p7FmrgH.jpg';
import profilePicture4 from '../../images/wC5ETq0.jpg';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
        user: this.props.user,
    }
  }

  render() {
  /* const list = this.state.apiData.map(data =>
      <div key={data._id}>
        <img className="profileImg" src={profilePicture} alt="Profile" />
        <p className="profileNameStl">{data.first_name}</p>
        <p className="profileEmailStl">{data.email}</p>
      </div>
    )*/
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
            </div>
            <div className="sugInnerFriendContainer">
              <div className="sugFriendStl">
                <div>
                  <img className="sugProfileImg" src={profilePicture2} alt="Profile sug" />
                </div>
                <p>Robert Beck</p>
              </div>
              <div className="sugFriendStl">
                <div>
                  <img className="sugProfileImg" src={profilePicture3} alt="Profile sug" />
                </div>
                <p>Åke Harvonen</p>
              </div>
              <div className="sugFriendStl">
                <div>
                  <img className="sugProfileImg" src={profilePicture4} alt="Profile sug" />
                </div>
                <p>André Wikander</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
