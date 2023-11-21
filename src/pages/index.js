import { React, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserPost from "../components/UserPost";
import ScrollToTop from "react-scroll-to-top";
import "./index.css";
import OtherPost from "../components/OtherPost";

const api = process.env.REACT_APP_API

const Home = (props) => {
    useEffect(() => {
        document.title = "ChatMeow";
        getUser();
        fetchPosts();
    }, []);

    const [posts, setposts] = useState([])
    const [uid, setuid] = useState()
    const [user, setuser] = useState({})
    
    const fetchPosts = async () => {
        const authtoken = localStorage.getItem("token");
        const url = api + "/api/allPosts";
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
    }

    const reload = () => {
        getUser();
        fetchPosts();
    };

    const getUser = async () => {        
        const authtoken = localStorage.getItem("token");
        const url = api + "/api/getUser";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken
            }
        });
        const json = await response.json();
        setuser(json);
    }

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
