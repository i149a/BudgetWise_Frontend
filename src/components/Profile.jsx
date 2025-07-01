import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ currentUser }) => {
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-info">
        {currentUser.picture && (
          <img src={currentUser.picture} alt="Profile" className="profile-pic" />
        )}
        <h3>{currentUser.username}</h3>
        <p>{currentUser.email}</p>
        <button className="change-pic-btn">Change Picture</button>
        <button className="change-pwd-btn">Change Password</button>
      </div>
      
      <div className="profile-links">
        <Link to="/transactions" className="profile-link">My Transactions</Link>
        <Link to="/categories" className="profile-link">My Categories</Link>
      </div>
    </div>
  );
};

export default Profile;