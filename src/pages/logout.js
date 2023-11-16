import React from 'react'
import { Navigate } from 'react-router-dom';

const Logout = (props) => {
    props.setLoggedIn(false);
    localStorage.removeItem('token');
    return (
        <div>
            <Navigate to="/login" />
        </div>
    )
}

export default Logout