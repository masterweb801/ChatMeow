import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import altrn from "../../images/profile.jpg"
import "../css/login.css";
import imageCompression from 'browser-image-compression';

const api = process.env.REACT_APP_API

const UpProfile = (props) => {
    document.title = "Update User Info";
    const [user, setuser] = useState({})
    const [name, setName] = useState("");
    const [loc, setLoc] = useState("");
    const [bio, setBio] = useState("");
    const [job, setJob] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState();

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

    const update = async (event) => {
        event.preventDefault();
        /*TODO: New API Endpoint and Logic */
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

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        setEmail(user.email)
        setName(user.name)
        user.img?setFile(user.img):setFile(altrn)
        user.loc?setLoc(user.loc):setLoc("")
        user.job?setJob(user.job):setJob("")
        user.phone?setPhone(user.phone):setPhone("")
        user.bio?setBio(user.bio):setBio("")
        user.dob?setDob(user.dob):setDob("")
    }, [user])
    

    return (
        <div className="container-for-login">
            {props.loggedIn === false ? <Navigate to="/login" /> : ""}
            <input type="checkbox" id="check" checked />
            <div className="registration form">
                <header>Update Your Info</header>
                <form action="#">
                    <div className="profile-pic">
                        <label className="clabel" htmlFor="file">
                            <span className="fas fa-camera"></span> &nbsp;
                            <span>Change Image</span>
                        </label>
                        <input type='file' id='file' onChange={selectImg} />
                        <img src={file} id="output" width="200" alt='' />
                    </div>

                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Your Name" required />
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Your Email" required />
                    <input type="text" placeholder='Your Phone Number' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    <input type="date" placeholder='Your Date of Birth' value={dob} onChange={(e) => { setDob(e.target.value) }} />
                    <input type="text" placeholder='Your Job Title' value={job} onChange={(e) => { setJob(e.target.value) }}/>
                    <input type="text" placeholder='Your Location' value={loc} onChange={(e) => { setLoc(e.target.value) }}/>
                    <textarea placeholder='Your Bio' value={bio} onChange={(e) => { setBio(e.target.value) }}/>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Give Password to Confirm" required autoComplete="false" />
                    <button type='submit' className='button' onClick={update} >Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpProfile