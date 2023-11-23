import React from 'react'
import WM from "./Website Maintenance.gif"
import "./500.css"

const Error = () => {
    return (
        <div className='Error'>
            <img src={WM} alt="Server is Down Due to Maintenance ..." />
        </div>
    )
}

export default Error