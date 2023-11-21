import React, { useEffect, useState } from 'react'
import "./index.css"
import photo from '../../images/profile.jpg'

const api = process.env.REACT_APP_API

const UserPost = (props) => {
    const [text, setText] = useState("");
    const [img, setImage] = useState(photo);

    function textAreaAdjust() {
        const element = document.getElementById('inp-usr');
        element.style.height = "1px";
        element.style.height = (25 + element.scrollHeight) + "px";
    }

    async function Post() {
        const url = api + "/api/post";
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
        props.reload();
    }

    useEffect(() => {
        if (props.user.img) {
            setImage(props.user.img);
        }
    }, [props.user.img]);

    return (
        <div className="status-update">
            <div className="user-profile-pic">
                <img src={img} alt="User Profile" />
                <label>{props.user.name}</label>
            </div>
            <div className="status-input">
                <textarea id='inp-usr' value={text} onKeyUp={textAreaAdjust} onChange={(e) => { setText(e.target.value) }} placeholder="What do you want to post?" rows="4"></textarea>
                <div className="btn-group">
                    <button className="post-button" onClick={Post}>
                        <i className="fa fa-paper-plane" style={{ color: "rgb(0, 119, 255)" }}></i> Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserPost