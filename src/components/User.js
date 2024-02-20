import React from 'react'

function User({ pfp, username }) {
    return (
        <div className="user-profile">
            <img src={pfp} alt="Profile" className="profile-picture" />
            <span className="username">{username}</span>
        </div>
    )
}

export default User