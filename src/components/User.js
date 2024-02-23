import React from 'react'

function User({ pfp, username, changeChat }) {
    return (
        <div className="user-profile" onClick={() => changeChat()}>
            <img src={pfp} alt="Profile" className="profile-picture" />
            <span className="username">{username}</span>
        </div>
    )
}

export default User