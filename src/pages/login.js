import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import axios from "axios";
import noimg from "../images/profile.jpg";

import "./login.css";

const Login = () => {
    document.title = "ChatMeow - Login / Signup";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [file, setFile] = useState(noimg);

    async function handleLoginClick(event) {
        event.preventDefault();
        
        const url = "http://localhost:5000/api/login"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
        } else {
            alert("Invalid Credentials")
            console.log(json)
        }

        setEmail("");
        setPassword("");
    }

    async function handleSignupClick(event) {
        event.preventDefault();
        if (name === "") {
            alert("Please enter your name!");
        } else if (email === "") {
            alert("Please enter your email!");
        } else if (password === "") {
            alert("Please enter your password!");
        } else if (password === cpassword) {
            axios({
                url: "http://localhost:5000/api/signup",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ name, email, password }),
            })
                .then((res) => {
                    sessionStorage.setItem("user", res.data.user);
                    sessionStorage.setItem("loggedIn", true);
                    alert(res.data.message);
                    setLoggedIn(true);
                })

                .catch((err) => {
                    if (err.response.data.error) {
                        alert(err.response.data.error);
                    } else if (err.response.data.errors[0].msg) {
                        alert(err.response.data.errors[0].msg);
                    } else {
                        console.log(err.response.data);
                    }
                });
            setName("");
            setEmail("");
            setPassword("");
            setcPassword("");
            setFile(noimg);
        } else {
            alert("Passwords do not match!");
        }
    }

    const selectImg = async (event) => {
        let image = document.getElementById("output");
        let opt = event.target.files[0];
        if (opt) {
            image.src = URL.createObjectURL(opt);
            let outAsBinary = await new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    resolve(event.target.result);
                };

                reader.onerror = (err) => {
                    reject(err);
                };

                reader.readAsDataURL(opt);
            });
            setFile(outAsBinary);
        }
    }

    return (
        <div className="container-for-login">
            {loggedIn === true ? <Navigate to="/" /> : ""}
            <input type="checkbox" id="check" />
            <div className="login form">
                <header>Login</header>
                <form action="#">
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your email" required />
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your password" required />
                    <button className='button' onClick={handleLoginClick} >Login</button>
                </form>
                <div className="signup">
                    <span className="signup">Don't have an account? &nbsp;
                        <label htmlFor="check">Signup</label>
                    </span>
                </div>
            </div>
            <div className="registration form">
                <header>Signup</header>
                <form action="#">

                    <div className="profile-pic">
                        <label className="clabel" htmlFor="file">
                            <span className="fas fa-camera"></span> &nbsp;
                            <span>Change Image</span>
                        </label>
                        <input type='file' id='file' onChange={selectImg} />
                        <img src={file} id="output" width="200" alt='' />
                    </div>

                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter your name" required />
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your email" required />
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Create a password" required />
                    <input type="password" value={cpassword} onChange={(e) => { setcPassword(e.target.value) }} placeholder="Confirm your password" required />
                    <button type='submit' className='button' onClick={handleSignupClick} >Signup</button>
                </form>
                <div className="signup">
                    <span className="signup">Already have an account? &nbsp;
                        <label htmlFor="check">Login</label>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login