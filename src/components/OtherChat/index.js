import React from 'react'
import "./index.css"
import usr from "../../images/profile.jpg"
import PropTypes from 'prop-types'


const OtherChat = (props) => {
    function pars() {
        props.swt(props.id)
    }
    return (
        <button id={props.id} className="usr-card" onClick={pars}>
            <img src={usr} alt="Person" width="96" height="96" />
            <div className='usr-card-label'>
                <label>{props.name}</label>
                <label>MSG:- {props.lastMsg}</label>
            </div>
        </button>
    )
}

OtherChat.propTypes = {
    name: PropTypes.string.isRequired,
    lastMsg: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    swt: PropTypes.func.isRequired
}

export default OtherChat