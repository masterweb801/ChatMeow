import { React } from "react";
import UserPost from "../components/UserPost";
import ScrollToTop from "react-scroll-to-top";
import "./index.css";
import OtherPost from "../components/OtherPost";

const Home = () => {
    document.title = "ChatMeow";
    return (
        <div className="container">
            <div className="chcon"></div>
            <div className="post-container">
                <UserPost />
                <OtherPost name="MD Mobashshirul Karim" id="1"/>
                <OtherPost name="MD Mobashshirul Karim" id="2"/>
            </div>
            <div className="chcon"></div>
            <ScrollToTop />
        </div>
    );
};

export default Home;
