import React from 'react'
import "./index.css"
import mini1 from "../../images/profile.jpg"
import mini2 from "./mini......png"
import PropTypes from 'prop-types'


const OtherPost = (props) => {
    const togl = () => {
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

    function textAreaAdjust() {
        const element = document.getElementById('cmn-usr' + props.id);
        element.style.height = "1px";
        element.style.height = (25 + element.scrollHeight) + "px";
    }

    return (
        <div className="post">
            <div className="other-profile-pic">
                <img src={mini1} alt="here" height="40" width="40" />
                <div className="other-top-label">
                    <label>{props.name}</label>
                    <label>4 hrs.</label>
                </div>
            </div>
            <div className="post-text">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae nihil placeat debitis facere asperiores,
                    sint quam sequi sed repellendus eius sunt quo quas tenetur earum impedit dicta?
                    Blanditiis, sapiente maiores.</p>
            </div>
            <div className="media">
                <img src={mini2} alt="here" />
            </div>
            <div className="other-btn-group">
                <button className='like-btn' onClick={togl}>
                    <i className="far fa-heart" id={"like" + props.id}></i>
                </button>
                <button onClick={() => {document.getElementById("cmn-usr"  + props.id).focus()}}>
                    <i className="far fa-comment"></i>
                </button>
                <button className="post-button">
                    <i className="far fa-share-square"></i>
                </button>
            </div>
            <div className="comment-box">
                <li className='other-comment'>
                    <div className="other-profile-pic">
                        <img src={mini1} alt="here" height="40" width="40" />
                        <div className="other-top-label">
                            <label>{props.name}</label>
                            <label>4 hrs.</label>
                        </div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Mollitia, eaque tenetur dolorum voluptate quidem laborum animi,
                        doloremque incidunt autem vitae sint exercitationem sapiente ab
                        possimus excepturi vel, temporibus placeat corrupti!
                    </p>
                </li>
                <div className="user-comment">
                    <div className="user-profile-pic">
                        <img src={mini1} alt="here" height="40" width="40" />
                        <label>{props.name}</label>
                    </div>
                    <div className="cmn-box">
                        <textarea id={'cmn-usr' + props.id} onKeyUp={textAreaAdjust} placeholder='Write a comment ...'></textarea>
                        <button><i className="fa fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

OtherPost.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
}

export default OtherPost