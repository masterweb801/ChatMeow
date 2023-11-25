import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import "./index.css"

const Game = (props) => {
    const [click, setclick] = useState("")

    useEffect(() => {
            let card = document.getElementById(props.id);
            
            card.addEventListener('click', () => {
                setclick(<Navigate to="/snake" />)
            })
    }, [props])
    
    return (
        <div className="card wallet" id={props.id}>
            {click}
            <div className="overlay"></div>
            <div className="circle">
                <img src={props.img} alt='' />
            </div>
            <p>{props.name}</p>
        </div>
    )
}

export default Game