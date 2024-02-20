// Sidebar.js
import React from 'react';
import User from './User';
import '../Sidebar.css'; // Import CSS for sidebar styling
import profile from '../bigger.jpg';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="user-profile">
                <img src={profile} alt="Profile" className="profile-picture" />
                <span className="username">Lance Toledo</span>
            </div>
            <User />
            {/* Add more sidebar elements as needed */}
        </div>
    );
}

export default Sidebar;
