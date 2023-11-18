import React, { useState, useEffect } from 'react'
import profile from "../../images/profile.jpg"
import "./index.css"

const MessageBox = (props) => {
    const [img, setImage] = useState(profile);
    
    useEffect(() => {
        if (props.item) {
            setImage(props.item[2]);
        }
    }, [props.item]);

    const close = () => {
        props.tog(false);
    }

    return (
        <div className='chat-area'>
            <div className='chat-header'>
                <img src={img} alt="Person" width="96" height="96" />
                <div className='usr-card-label'>
                    <label>{props.item[1]}</label>
                    <label>Active Now</label>
                </div>
                <button className="close" onClick={close}>X</button>
            </div>
            <div className="chat-box">

                <div className="chat outgoing">
                    <div className="details">
                        <p>Hello</p>
                    </div>
                </div>

                <div className="chat incoming">
                    <img src={img} alt="" />
                        <div className="details">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, laborum! Officiis iure eius voluptas ipsum! Mollitia alias in pariatur repudiandae. Architecto voluptatem voluptatum repudiandae quaerat reprehenderit deleniti distinctio vero perferendis!</p>
                        </div>

                </div>

            </div>
            <form action="#" className="typing-area">
                <input type="text" className="incoming_id" name="incoming_id" hidden />
                <input type="text" name="message" className="input-field" placeholder="Type a message here..." autoComplete="off" />
                <button className='msg-send'><i className="fas fa-paper-plane"></i></button>
            </form>
        </div>
    )
}

export default MessageBox