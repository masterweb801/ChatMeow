import React from 'react'
import { Navigate } from 'react-router-dom'

const Games = (props) => {
    document.title = "ChatMeow - Games"
    return (
        <div>
            {props.loggedIn === false ? <Navigate to="/login" /> : ""}
        </div>
    )
}

export default Games