import React, { useState, useEffect } from 'react'
import profile from "../../images/profile.jpg"
import "./index.css"

const MessageBox = (props) => {
    const [img, setImage] = useState(profile);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState();
    const id = props.item[0];

    const close = () => {
        props.tog(false);
        props.back()
    }

    useEffect(() => {
        if (props.item) {
            setImage(props.item[2]);
        }
        const fetchChats = async () => {
            const authtoken = localStorage.getItem("token");
            const url = "http://localhost:5000/api/allChat";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authtoken
                },
                body: JSON.stringify({ id })
            });
            const json = await response.json();
            setChats(json);
        };

        const interval = setInterval(() => {
            fetchChats();
        }, 1000);
        return () => clearInterval(interval);
    }, [props.item, id]);

    const newChat = async (event) => {
        event.preventDefault();
        if (message !== "") {
            const url = "http://localhost:5000/api/newChat";
            const authtoken = localStorage.getItem("token");
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authtoken
                },
                body: JSON.stringify({ id: id, msg: message })
            });
            await response.json();
            setMessage("");
            setTimeout(() => {
                let elem = document.getElementById('all-messages');
                elem.scrollTop = elem.scrollHeight;
            }, 1000);
        };
    };

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
            <div className="chat-box" id='all-messages'>
                {chats.map((item, index) => {
                    if (item.in_user_id === props.item[0]) {
                        return <div className="chat incoming" key={index}>
                            <img src={img} alt="" />
                            <div className="details">
                                <p>{item.msg}</p>
                            </div>
                        </div>
                    } else if (item.out_user_id === props.item[0]) {
                        return <div className="chat outgoing" key={index}>
                            <div className="details">
                                <p>{item.msg}</p>
                            </div>
                        </div>
                    } else {
                        return <></>
                    }
                })}

            </div>
            <form className="typing-area" onSubmit={newChat}>
                <input type="text" id="inp-usr" name="message" value={message} onChange={(e) => { setMessage(e.target.value) }} className="input-field" placeholder="Type a message here..." />
                <button className='msg-send'><i className="fas fa-paper-plane"></i></button>
            </form>
        </div>
    )
}

export default MessageBox