import React from 'react'
import { Navigate } from 'react-router-dom'

const Notifications = (props) => {
    document.title = "ChatMeow - Notifications"
    return (
        <div>
            {props.loggedIn === false ? <Navigate to="/login" /> : ""}
        </div>
    )
}

export default Notifications