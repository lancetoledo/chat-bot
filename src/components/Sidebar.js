// Sidebar.js
import React from 'react';
import User from './User';
import '../Sidebar.css'; // Import CSS for sidebar styling
import lance from '../images/lance.jpg';
import jessy from '../images/Jessypfp.jpg'
import chatgpt from '../images/chatgptpfp.jpg'
import keanu from '../images/keanu.jpg'
import obama from '../images/obama.jpg'
import curry from '../images/stephencurry.jpg'
import swift from '../images/swift.jpg'
import smith from '../images/willsmith.jpg'
import harvey from '../images/steveharvey.jpg'

const Sidebar = ({ changeChat }) => {
    console.log(changeChat)
    return (
        <div className="sidebar">
            <User pfp={chatgpt} username={"Chat GPT"} changeChat={changeChat} />
            <User pfp={lance} username={"Lance Toledo"} changeChat={changeChat} />
            <User pfp={jessy} username={"Jessy The"} changeChat={changeChat} />
            <User pfp={smith} username={"Will Smith"} changeChat={changeChat} />
            <User pfp={keanu} username={"Keanu Reeves"} changeChat={changeChat} />
            <User pfp={swift} username={"Taylor Swift"} changeChat={changeChat} />
            <User pfp={curry} username={"Stephen Curry"} changeChat={changeChat} />
            <User pfp={obama} username={"Barack Obama"} changeChat={changeChat} />
            <User pfp={harvey} username={"Steve Harvey"} changeChat={changeChat} />
        </div>
    );
}

export default Sidebar;
