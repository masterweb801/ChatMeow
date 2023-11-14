import React from 'react'
import profile from "../../images/profile.jpg"
import "./index.css"

const MessageBox = () => {
    return (
        <div className='chat-area'>
            <div className='chat-header'>
                <img src={profile} alt="Person" width="96" height="96" />
                <div className='usr-card-label'>
                    <label>MD Mobashshirul Karim</label>
                    <label>Active Now</label>
                </div>
            </div>
            <div className="chat-box">

                <div className="chat outgoing">
                    <div className="details">
                        <p>Hello</p>
                    </div>
                </div>

                <div className="chat incoming">
                    <img src={profile} alt="" />
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