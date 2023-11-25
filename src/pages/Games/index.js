import React from 'react'
import { Navigate } from 'react-router-dom'
// import Game from '../../components/Game'

const Games = (props) => {
    document.title = "ChatMeow - Games"
    return (
        <div>
            {props.loggedIn === false ? <Navigate to="/login" /> : ""}
            {/* <Game id="snake" name="Snake" img="https://cdn.icon-icons.com/icons2/1465/PNG/512/492snake_100855.png" /> */}
        </div>
    )
}

export default Games