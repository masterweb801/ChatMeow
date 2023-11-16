import React, { useState } from 'react'
import "./index.css"
import photo from '../../images/profile.jpg'

const UserPost = (props) => {
    const [text, setText] = useState("");
    function textAreaAdjust() {
        const element = document.getElementById('inp-usr');
        element.style.height = "1px";
        element.style.height = (25 + element.scrollHeight) + "px";
    }

    async function post() {
        const url = "http://localhost:5000/api/post";
        const authtoken = localStorage.getItem("token");
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken
            },
            body: JSON.stringify({ text })
        });
        await response.json();
        alert("Successfully Posted!");
        setText("");
    }

    return (
        <div className="status-update">
            <div className="user-profile-pic">
                <img src={photo} alt="User Profile" />
                <label>{props.user.name}</label>
            </div>
            <div className="status-input">
                <textarea id='inp-usr' value={text} onKeyUp={textAreaAdjust} onChange={(e) => { setText(e.target.value) }} placeholder="What do you want to post?" rows="4"></textarea>
                <div className="btn-group">
                    <button className="post-button" onClick={post}>
                        <i className="fa fa-paper-plane" style={{ color: "rgb(0, 119, 255)" }}></i> Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserPost