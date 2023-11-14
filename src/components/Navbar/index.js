import React from "react";
import './index.css'
import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom";


const Navbar = (props) => {
    return (
        <div className="wrapper">
            <nav>
                <input type="checkbox" id="show-search" />
                <input type="checkbox" id="show-menu" />
                <label htmlFor="show-menu" className="menu-icon"><i className="fas fa-bars"></i></label>
                <div className="content">
                    <div className="logo">ChatMeow</div>
                    <ul className="links">
                        <li>
                            <NavLink to="/" >
                                <i className="fas fa-house"></i> &nbsp; Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/messages" activestyle='true'>
                                <i className="fas fa-envelope"></i> &nbsp; Chat
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/notifications" activestyle='true'>
                                <i className="fas fa-bell"></i> &nbsp; Notifications
                            </NavLink>
                        </li>
                        <li>
                            <button className="desktop-link"><i className="fas fa-gear"></i> &nbsp; Settings</button>
                            <input type="checkbox" id="show-services" />
                            <label htmlFor="show-services"><i className="fas fa-gear"></i> &nbsp; Settings</label>
                            <ul>
                                <li>
                                    <button onClick={props.toggle}>
                                        <i className={`fas fa-${props.mode === "light" ? "moon" : "sun"}`}></i> &nbsp; {props.mode === "light" ? "Dark" : "Light"} Mode
                                    </button>
                                </li>
                                {sessionStorage.getItem("loggedIn") === null ? <li>
                                    <NavLink to="/login" activestyle='true'>
                                        <i className="fas fa-sign-in"></i> &nbsp; Login / Signup
                                    </NavLink>
                                </li> : <li>
                                    <NavLink to="/logout" activestyle='true' style={{ backgroundColor: "#e83427" }}>
                                        <i className="fas fa-sign-out"></i> &nbsp; Logout
                                    </NavLink>
                                </li>}
                            </ul>
                        </li>
                    </ul>
                </div>
                <label htmlFor="show-search" className="search-icon"><i className="fas fa-search"></i></label>
                <form action="#" className="search-box">
                    <input type="text" placeholder="Type Something to Search..." required />
                    <button type="submit" className="go-icon"><i className="fas fa-long-arrow-alt-right"></i></button>
                </form>
            </nav>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired
};

export default Navbar;
