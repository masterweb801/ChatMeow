import { React, useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import UserPost from "../components/UserPost";
import ScrollToTop from "react-scroll-to-top";
import OtherPost from "../components/OtherPost";
import Loader from '../components/Loader';
import "./css/index.css";

const api = process.env.REACT_APP_API

const Home = (props) => {
    const [posts, setposts] = useState([]);
    const [uid, setuid] = useState();
    const [page, setpage] = useState(1);
    const [user, setuser] = useState({});
    const [load, setload] = useState(true);
    const [loader, setloader] = useState(true);

    const fetchPosts = useCallback(async () => {
        const authtoken = localStorage.getItem("token");
        const url = api + "/api/allPosts";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authtoken
                },
                body: JSON.stringify({ page: page, limit: 5 })
            });
            const json = await response.json();
            let rposts = json[0];
            rposts.reverse();
            setposts((prev) => [...prev, ...rposts])
            setuid(json[1]);
            setloader(false);
        } catch (error) {
            console.log(error);
        }
    }, [page])

    const reload = () => {
        setloader(true);
        setposts([])
        setpage(1);
    };

    const getUser = async () => {
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
            console.log(error);
        }
    }

    const handleInfiniteScroll = () => {
        if (window.innerHeight !== document.documentElement.scrollHeight) {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
                setloader(true);
                setpage((prev) => prev + 1)
            }
        }
    };

    useEffect(() => {
        document.title = "ChatMeow";
        getUser();
        fetchPosts();
        setload(false);
    }, [fetchPosts]);

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => { window.removeEventListener("scroll", handleInfiniteScroll); };
    })

    return (
        <>
            {
                load === true ? <> <Loader height="75vh" size="70" load="main" /></> :
                    <div className="container">
                        {props.loggedIn === false ? <Navigate to="/login" /> : ""}
                        <div className="chcon"></div>
                        <div className="post-container">
                            <UserPost user={user} reload={reload} />
                            {posts.map((item, index) => {
                                return <OtherPost key={index} uid={uid} item={item} id={index.toString()} reload={reload} />
                            })}
                            {loader===true?
                            <Loader height="80px" size="50" />:""}
                        </div>
                        <div className="chcon"></div>
                        <ScrollToTop />
                    </div>
            }
        </>
    );
};

export default Home;
