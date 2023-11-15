import React from 'react'
import "./index.css"
import profile from "../../images/profile.jpg"
import PropTypes from 'prop-types'


const OtherPost = (props) => {
    const togLike = () => {
        let likeBtn = document.getElementById('like' + props.id);

        if (likeBtn.classList.contains("far")) {
            likeBtn.classList.add("fas");
            likeBtn.classList.remove("far");
            likeBtn.style.color = "red";
        } else if (likeBtn.classList.contains("fas")) {
            likeBtn.classList.add("far");
            likeBtn.classList.remove("fas");
            likeBtn.style.color = "black";
        }
    }

    const togText = () => {
        let text = document.getElementById(`text-${props.id}`).innerText; 
        navigator.clipboard.writeText(text);
        alert("Successfully Copied To Clipboard")
    }

    return (
        <div className="post">
            <div className="other-profile-pic">
                <img src={profile} alt="here" height="40" width="40" />
                <div className="other-top-label">
                    <label>{props.name}</label>
                    <label>4 hrs.</label>
                </div>
            </div>
            <div className="post-text">
                <p id={`text-${props.id}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae nihil placeat debitis facere asperiores,
                    sint quam sequi sed repellendus eius sunt quo quas tenetur earum impedit dicta?
                    Blanditiis, sapiente maiores.</p>
            </div>
            <div className="other-btn-group">
                <button className='like-btn' onClick={togLike}>
                    <i className="far fa-heart" id={"like" + props.id}></i>
                </button>
                <button className="post-button" onClick={togText}>
                    <i className="far fa-share-square"></i>
                </button>
            </div>
        </div>
    )
}

OtherPost.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
}

export default OtherPost