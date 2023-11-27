import { React, useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import OtherPost from "../components/OtherPost";
import "./css/index.css";
import "./css/user.css";

const api = process.env.REACT_APP_API

const Home = (props) => {
    const [posts, setposts] = useState([])
    const [user, setuser] = useState({})

    const fetchPosts = useCallback(async () => {
        const authtoken = localStorage.getItem("token");
        const url = api + "/api/usrPost";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authtoken
                }
            });
            const json = await response.json();
            json.reverse();
            setposts(json);
        } catch (error) {
            props.error(true);
        }
    }, [props])

    const reload = () => {
        getUser();
        fetchPosts();
    };

    const getUser = useCallback(async () => {
        const authtoken = localStorage.getItem("token");
        const url = api + "/api/getUser";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authtoken
                }
            });
            const json = await response.json();
            setuser(json);
        } catch (error) {
            props.error(true);
        }
    }, [props])

    useEffect(() => {
        getUser();
        fetchPosts();
        document.title = user.name;
    }, [fetchPosts, getUser, user]);

    return (
        <div>
            {props.loggedIn === false ? <Navigate to="/login" /> : ""}
            <div className="container-main">
                <div className="profile">
                    <img src={user.img} className="profile-picture" alt="" />
                    <div className="profile-details">
                        <h2>
                            {user.name}
                        </h2>
                        <div className="all-details">
                            {user.job !== undefined ? <p><b>{user.job}</b></p> : ""}
                            <div className="all-details">
                                {user.location !== undefined ? <p><i className="fa fa-map-marker"></i>&nbsp;  Location: {user.location} </p> : ""}
                                {user.dob !== undefined ? <p><i className="fas fa-calendar-alt"></i>&nbsp;  Date of Birth: {user.dob} </p> : ""}
                                <p><i className="fas fa-envelope"></i>&nbsp;  Email: {user.email} </p>
                                <p><i className="fas fa-message"></i>&nbsp;  Post Count: {posts.length} </p>
                                {user.phone !== undefined ? <p><i className="fas fa-phone"></i>&nbsp;  Phone: {user.phone}</p> : ""}
                            </div>
                            {user.bio !== undefined ? <><h3>About Me:</h3>
                                <div className="all-details">
                                    <p className="bio">
                                        {user.bio}
                                    </p>
                                </div></> : ""}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="chcon"></div>
                <div className="post-container">
                    {posts.map((item, index) => {
                        return <OtherPost key={index} uid={user._id} item={item} id={index.toString()} reload={reload} />
                    })}
                </div>
                <div className="chcon"></div>
                <ScrollToTop />
            </div>
        </div>
    );
};

export default Home;
