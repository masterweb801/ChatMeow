import { React, useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import UserPost from "../components/UserPost";
import ScrollToTop from "react-scroll-to-top";
import OtherPost from "../components/OtherPost";
import "./index.css";

const api = process.env.REACT_APP_API

const Home = (props) => {
    const [posts, setposts] = useState([])
    const [uid, setuid] = useState()
    const [user, setuser] = useState({})

    const fetchPosts = useCallback(async () => {
        const authtoken = localStorage.getItem("token");
        const url = api + "/api/allPosts";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authtoken
                }
            });
            const json = await response.json();
            let rposts = json[0];
            rposts.reverse();
            setposts(rposts)
            setuid(json[1]);
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
        document.title = "ChatMeow";
        getUser();
        fetchPosts();
    }, [fetchPosts, getUser]);

    return (
        <div className="container">
            {props.loggedIn === false ? <Navigate to="/login" /> : ""}
            <div className="chcon"></div>
            <div className="post-container">
                <UserPost user={user} reload={reload} />
                {posts.map((item, index) => {
                    return <OtherPost key={index} uid={uid} item={item} id={index.toString()} />
                })}
            </div>
            <div className="chcon"></div>
            <ScrollToTop />
        </div>
    );
};

export default Home;
