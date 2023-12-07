import React, { useState, useEffect } from 'react'
import "./index.css"
import usr from "../../images/profile.jpg"
import PropTypes from 'prop-types'


const OtherChat = (props) => {
    const [img, setImage] = useState(usr);
    const style = {
        backgroundColor: props.mode === "light"? "#fff": "#556",
        color: props.mode === "light"? "#000": "#fff"
    }

    function pars() {
        props.swt([props.item._id, props.item.name, props.item.img])
        props.tog(true)
    }

    useEffect(() => {
        if (props.item.img) {
            setImage(props.item.img);
        }
    }, [props.item.img]);

    return (
        <button className={`usr-card`} onClick={pars} style={style}> {/* TODO: Hover not working */}
            <img src={img} alt="Person" width="96" height="96" />
            <div className='usr-card-label'>
                <label>{props.item.name}</label>
            </div>
        </button>
    )
}

OtherChat.propTypes = {
    item: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    swt: PropTypes.func.isRequired
}

export default OtherChat