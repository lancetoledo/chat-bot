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

const Sidebar = () => {
    return (
        <div className="sidebar">
            <User pfp={chatgpt} username={"Chat GPT"} />
            <User pfp={lance} username={"Lance Toledo"} />
            <User pfp={jessy} username={"Jessy The"} />
            <User pfp={smith} username={"Will Smith"} />
            <User pfp={keanu} username={"Keanu Reeves"} />
            <User pfp={swift} username={"Taylor Swift"} />
            <User pfp={curry} username={"Stephen Curry"} />
            <User pfp={obama} username={"Barack Obama"} />
            <User pfp={harvey} username={"Steve Harvey"} />
        </div>
    );
}

export default Sidebar;
