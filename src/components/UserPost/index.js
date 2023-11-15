import React from 'react'
import "./index.css"
import photo from '../../images/profile.jpg'

const UserPost = () => {
    function textAreaAdjust() {
        const element = document.getElementById('inp-usr');
        element.style.height = "1px";
        element.style.height = (25 + element.scrollHeight) + "px";
    }

    return (
        <div className="status-update">
            <div className="user-profile-pic">
                <img src={photo} alt="User Profile" />
                <label>MD Mobashshirul Karim</label>
            </div>
            <div className="status-input">
                <textarea id='inp-usr' onKeyUp={textAreaAdjust} placeholder="What do you want to post?" rows="4"></textarea>
                <div className="btn-group">
                    <button className="post-button">
                        <i className="fa fa-paper-plane"  style={{color: "rgb(0, 119, 255)"}}></i> Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserPost