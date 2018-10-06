import React, { Component } from 'react';
import './CSS/ProfileComp.css';
import profilePicture from '../images/E3VsnEe.jpg';
import profilePicture2 from '../images/LBy4WcJ.jpg';
import profilePicture3 from '../images/p7FmrgH.jpg';
import profilePicture4 from '../images/wC5ETq0.jpg';

class ProfileComp extends Component {
  render() {
    return (
      <div className="mainProfileContainer">
        <div>
          <img className="profileImg" src={profilePicture} alt="Profile Picture" />
          <p className="profileNameStl">Sebastian Gunnervald</p>
          <p className="profileEmailStl">sebastian.gunnervald@gmail.com</p>
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
                  <img className="sugProfileImg" src={profilePicture2} alt="Profile Picture" />
                </div>
                <p>Robert Beck</p>
              </div>
              <div className="sugFriendStl">
                <div>
                  <img className="sugProfileImg" src={profilePicture3} alt="Profile Picture" />
                </div>
                <p>Åke Harvonen</p>
              </div>
              <div className="sugFriendStl">
                <div>
                  <img className="sugProfileImg" src={profilePicture4} alt="Profile Picture" />
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

export default ProfileComp;
