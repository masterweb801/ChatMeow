import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import "./login.css";
import altrn from "../images/profile.jpg"
import imageCompression from 'browser-image-compression';

const api = process.env.REACT_APP_API

const Login = (props) => {
    document.title = "ChatMeow - Login / Signup";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const [file, setFile] = useState();

    async function handleLoginClick(event) {
        event.preventDefault();

        try {
            const url = api + "/api/login";
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
                props.setLoggedIn(true);
            } else {
                alert("Invalid Credentials")
                console.log(json)
            }

            setEmail("");
            setPassword("");
        } catch (error) {
            props.error(true)
        }
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
            try {
                const url = api + "/api/signup"
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password, file })
                });
                const json = await response.json();
                if (json.success) {
                    localStorage.setItem('token', json.authtoken)
                    props.setLoggedIn(true);
                } else {
                    alert("Invalid Credentials")
                    console.log(json)
                }

                setName("");
                setEmail("");
                setPassword("");
                setcPassword("");
                setFile(altrn);
            } catch (error) {
                props.error(true)
            }
        } else {
            alert("Passwords do not match!");
        }
    }

    const selectImg = async (event) => {
        let image = document.getElementById("output");
        let opt = event.target.files[0];
        if (opt) {
            image.src = URL.createObjectURL(opt);
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 400,
                useWebWorker: true
            }
            try {
                const compressedFile = await imageCompression(opt, options);
                let outAsBinary = await new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        resolve(event.target.result);
                    };

                    reader.onerror = (err) => {
                        reject(err);
                    };

                    reader.readAsDataURL(compressedFile);
                });
                setFile(outAsBinary);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="container-for-login">
            {props.loggedIn === true ? <Navigate to="/" /> : ""}
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
                        <img src={altrn} id="output" width="200" alt='' />
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