import React, { useState } from 'react'
import Search from "../components/Search";
import PropTypes from 'prop-types'
import OtherChat from '../components/OtherChat';
import "./messages.css"
import MessageBox from '../components/MessageBox';

const Chat = (props) => {
    document.title = "ChatMeow - Messages";
    const [fElement, sfElement] = useState("null");

    return (
        <div className='messages'>
            <div className="users">
                <Search mode={props.mode} />
                <OtherChat name="MD Mobashshirul Karim" lastMsg="Hi" id="1b" swt={sfElement} />
                <OtherChat name="MD Mobashshirul Karim" lastMsg="Hi" id="2b" swt={sfElement} />
                <OtherChat name="MD Mobashshirul Karim" lastMsg="Hi" id="3b" swt={sfElement} />
                <OtherChat name="MD Mobashshirul Karim" lastMsg="Hi" id="4b" swt={sfElement} />
            </div>
            <div className="chat">
                <MessageBox />
                <div style={{ display: "none" }}>
                    {fElement === "null" ? "Select a User to Start Conversation" : "Clicked Button's ID is " + fElement}
                </div>
            </div>
        </div>
    )
}

Chat.propTypes = {
    mode: PropTypes.string.isRequired
}

export default Chat