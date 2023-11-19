import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import Search from "../components/Search";
import PropTypes from 'prop-types'
import OtherChat from '../components/OtherChat';
import "./messages.css"
import MessageBox from '../components/MessageBox';

const Chat = (props) => {
    const [fElement, setElement] = useState(null);
    const [focus, setFocus] = useState(false);
    const [users, setUsers] = useState([])

    useEffect(() => {
        document.title = "ChatMeow - Messages";
        fetchUsers();
    }, []);

    const sfElement = (value) => {
        setElement(value);
        toggle();
    };

    const toggle = () => {
        try {
            if (window.innerWidth <= 872) {
                if (focus === true) {
                    document.getElementById("aside-messages").style.display = "none";
                    document.getElementById("users").style.display = "block";
                } else {
                    document.getElementById("aside-messages").style.display = "block";
                    document.getElementById("users").style.display = "none";
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUsers = async () => {
        const authtoken = localStorage.getItem("token");
        const url = "http://localhost:5000/api/allUser"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken
            }
        });
        const json = await response.json();
        setUsers(json);
    };

    return (
        <div className='messages'>
            {props.loggedIn === false ? <Navigate to="/login" /> : ""}
            <div className="users" id='users'>
                <Search mode={props.mode} />
                {users.map((item, index) => {
                    return <OtherChat key={index} item={item} id={index.toString()} swt={sfElement} tog={setFocus} />
                })}
            </div>
            {focus === false ?
                <aside className="chat" id="aside-messages">
                    <div className='nsel'>Select an User to Start Conversation</div>
                </aside> :
                <aside className="chat"  id="aside-messages">
                    <MessageBox item={fElement} tog={setFocus} back={toggle} />
                </aside>
            }
        </div>
    )
}

Chat.propTypes = {
    mode: PropTypes.string.isRequired
}

export default Chat