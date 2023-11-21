import React, { useEffect, useState } from 'react'
import "./index.css"
import profile from "../../images/profile.jpg"
import PropTypes from 'prop-types'

const api = process.env.REACT_APP_API

const OtherPost = (props) => {
    const [likes, setLikes] = useState();
    const [img, setImage] = useState(profile);
    const togLike = async () => {
        let likeBtn = document.getElementById('like' + props.id);

        const authtoken = localStorage.getItem("token");
        const url = api + "/api/likePost";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken
            },
            body: JSON.stringify({ id: props.item._id })
        });
        const json = await response.json();
        let likers = json[0].likers;

        if (likers.includes(json[1])) {
            likeBtn.classList.add("fas");
            likeBtn.classList.remove("far");
            likeBtn.style.color = "red";
            setLikes(json[0].likes);
        } else if (!likers.includes(json[1])) {
            likeBtn.classList.add("far");
            likeBtn.classList.remove("fas");
            likeBtn.style.color = "black";
            setLikes(json[0].likes);
        }
    }

    const togText = () => {
        let text = document.getElementById(`text-${props.id}`).innerText;
        navigator.clipboard.writeText(text);
        alert("Successfully Copied To Clipboard")
    }

    useEffect(() => {
        let likeBtn = document.getElementById('like' + props.id);
        let likers = props.item.likers;
        setLikes(props.item.likes);
        if (likers.includes(props.uid)) {
            likeBtn.classList.add("fas");
            likeBtn.classList.remove("far");
            likeBtn.style.color = "red";
        }
        if (props.item.userImg) {
            setImage(props.item.userImg);
        }
    }, [props.uid, props.id, props.item.likers, props.item.likes, props.item.userImg]);

    return (
        <div className="post">
            <div className="other-profile-pic">
                <img src={img} alt="here" height="40" width="40" />
                <div className="other-top-label">
                    <label>{props.item.userName}</label>
                    <label>4 hrs.</label>
                </div>
            </div>
            <div className="post-text">
                <p id={`text-${props.id}`}>{props.item.text}</p>
            </div>
            <div className="other-btn-group">
                <div className='like-number'>{likes}</div>
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
    item: PropTypes.object
}

export default OtherPost