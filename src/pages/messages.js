import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import Search from "../components/Search";
import PropTypes from 'prop-types'
import OtherChat from '../components/OtherChat';
import "./messages.css"
import MessageBox from '../components/MessageBox';

const Chat = (props) => {
    const [fElement, sfElement] = useState("null");
    const [users, setUsers] = useState([])

    useEffect(() => {
        document.title = "ChatMeow - Messages";
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const authtoken = localStorage.getItem("token");
        const url = "http://localhost:5000/api/allPosts"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken
            }
        });
        const json = await response.json();
        setUsers(json);
    }

    return (
        <div className='messages'>
            {props.loggedIn === false ? <Navigate to="/login" /> : ""}
            <div className="users">
                <Search mode={props.mode} />
                {/* {users.map((item, index) => {
                    return <OtherPost key={index} uid={uid} item={item} id={index.toString()} />
                })} */}
                <OtherChat name="MD Mobashshirul Karim" lastMsg="Hi" id="1" swt={sfElement} />
                <OtherChat name="MD Mobashshirul Karim" lastMsg="Hi" id="2" swt={sfElement} />
                <OtherChat name="MD Mobashshirul Karim" lastMsg="Hi" id="3" swt={sfElement} />
                <OtherChat name="MD Mobashshirul Karim" lastMsg="Hi" id="4" swt={sfElement} />
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