import React, { useState, useEffect, useCallback } from 'react'
import { Navigate } from 'react-router-dom';
import Search from "../components/Search";
import PropTypes from 'prop-types'
import OtherChat from '../components/OtherChat';
import "./css/messages.css"
import MessageBox from '../components/MessageBox';

const api = process.env.REACT_APP_API

const Chat = (props) => {
    const [fElement, setElement] = useState(null);
    const [focus, setFocus] = useState(false);
    const [users, setUsers] = useState([])

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

    const fetchUsers = useCallback(async () => {
        const authtoken = localStorage.getItem("token");

        try {
            const url = api + "/api/allUser";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authtoken
                }
            });
            const json = await response.json();
            setUsers(json);
        } catch (error) {
            props.error(true)
        }
    }, [props]);

    useEffect(() => {
        document.title = "ChatMeow - Messages";
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className='messages' style={{backgroundColor: props.mode === "light"? "#faf9f9": "#111"}}>
            {props.loggedIn === false ? <Navigate to="/login" /> : ""}
            <div className="users" id='users' style={{backgroundColor: props.mode === "light"? "#faf9f9": "#111"}}>
                <Search mode={props.mode} />
                {users.map((item, index) => {
                    return <OtherChat key={index} item={item} id={index.toString()} swt={sfElement} ele={fElement} tog={setFocus} mode={props.mode} />
                })}
            </div>
            {focus === false ?
                <aside className="chats" id="aside-messages">
                    <div className='nsel' style={{color: props.mode === "light"? "#000": "#fff"}}>Select an User to Start Conversation</div>
                </aside> :
                <aside className="chats" id="aside-messages">
                    <MessageBox item={fElement} tog={setFocus} back={toggle} mode={props.mode} />
                </aside>
            }
        </div>
    )
}

Chat.propTypes = {
    mode: PropTypes.string.isRequired
}

export default Chat