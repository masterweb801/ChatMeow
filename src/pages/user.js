import { React, useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import OtherPost from "../components/OtherPost";
import "./css/index.css";
import "./css/user.css";
import Loader from "../components/Loader";

const api = process.env.REACT_APP_API

const Home = (props) => {
    const [posts, setposts] = useState([])
    const [user, setuser] = useState({})
    const [gte, setGte] = useState("");
    const [page, setpage] = useState(1);
    const [load, setload] = useState(true);
    const [loader, setloader] = useState(true);

    const fetchPosts = useCallback(async () => {
        const authtoken = localStorage.getItem("token");
        const url = api + "/api/usrPost";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authtoken
                },
                body: JSON.stringify({page: page, limit: 5})
            });
            const json = await response.json();
            json.reverse();
            setposts((prev)=> [...prev, ...json])
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
            document.title = json.name
        } catch (error) {
            console.log(error);
        }
    }

    const goEdit = () => {
        setGte(<Navigate to="/edit-profile" />);
    }

    const handleInfiniteScroll = () => {
        if (window.innerHeight !== document.documentElement.scrollHeight) {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
                setloader(true);
                setpage((prev)=> prev + 1)
            }
        }
    };

    useEffect(() => {
        getUser();
        fetchPosts();
        setload(false);
    }, [fetchPosts]);

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => {window.removeEventListener("scroll", handleInfiniteScroll);};
    })

    return (
        <>
            {load === true ? <><Loader height="75vh" size="70" load="main" /></> :
                <div>
                    {props.loggedIn === false ? <Navigate to="/login" /> : ""}
                    {gte}
                    <div className="container-main">
                        <div className="profile" style={{ color: props.mode === "dark" ? "#fff" : "#000" }}>
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
                        <div className="profile-edit">
                            <button id="profile-edit-btn" onClick={goEdit}><i className="fas fa-pen"></i>&nbsp; Edit Profile</button>
                        </div>
                    </div>
                    <div className="container">
                        <div className="chcon"></div>
                        <div className="post-container">
                            {posts.map((item, index) => {
                                return <OtherPost key={index} uid={user._id} item={item} id={index.toString()} reload={reload} />
                            })}
                            {loader===true?
                            <Loader height="80px" size="50" />:""}
                        </div>
                        <div className="chcon"></div>
                        <ScrollToTop />
                    </div>
                </div>
            }
        </>
    );
};

export default Home;
