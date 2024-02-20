import React from 'react'
import profile from '../Jessypfp.jpg';

function User() {
    return (
        <div className="user-profile">
            <img src={profile} alt="Profile" className="profile-picture" />
            <span className="username">Jessy The</span>
        </div>
    )
}

export default User