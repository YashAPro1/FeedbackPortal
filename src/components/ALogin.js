import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';
import { notifyE, notifyS } from "../funcs/func1";
import axios from "axios";
import CSRFToken from "../views/Admin/CSRFToken";


export default function ALogin() {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const [user1, setUser1] = useState();
    const [pass1, setPass1] = useState();
    const [email1, setEmail1] = useState();

    const timer = ms => new Promise(res => setTimeout(res, ms));

    function retId(idname) {
        return document.getElementById(idname);
    }
    console.log(cookies.get('csrftoken'));
    const doLogin = async () => {
        
        await axios.post("http://127.0.0.1:8000/api/login/",{ "email": email1, "username": user1, "password": pass1 },
        {
            headers: {
                'Content-Type':'application/json',
                // 'X-CSRFToken': "YOrGN1TPl3SoAqMDTkaX7oTgGWIMz6fZ"
                'X-CSRFToken': cookies.get('csrftoken'),
            }
        })
            .then((res) => {
                // setDname();
                notifyS({ msg: "Successfully created!" })
                // setOpen(false);
                // fetchDept();
            })
            .catch((err) => {
                console.log(err);
                notifyE("Wrong Credentials");
            })
        // if (user1 === "comph" && pass1 === "1234") {
        //     notifyS({ msg: "Successful" });
        //     cookies.set("user", user1, { maxAge: 1800 })
        //     retId("idDoLog").setAttribute("disabled", "disabled");
        //     await timer(500);
        //     navigate("/login/details");
        // }
        // else if (user1 === "compl" && pass1 === "1234") {
        //     notifyS({ msg: "Successful" });
        //     cookies.set("user", user1, { maxAge: 1800 });
        //     retId("idDoLog").setAttribute("disabled", "disabled");
        //     await timer(500);
        //     navigate("/login/details");
        // }
        // else {
        //     notifyE("Wrong Credentials");
        // }
        // notifyS();
        // notifyE("Error!");
    }

    return (
        <>
            <Navbar />

            <div className="divf fullbg fullWH">
                <ToastContainer />
                <div className="dashbgI"></div>
                <CSRFToken/>
                <div className="divf loginC fdirc">
                    <p className="f2 headT">Login</p>
                    <div className="divf divInsL gapSM mUpM">
                        <p className="f1-5">Username</p>
                        <input placeholder="username" className="insLU" onChange={(e) => { setUser1(e.target.value) }} />
                    </div>
                    <div className="divf divInsL gapSM">
                        <p className="f1-5">Email</p>
                        <input placeholder="Email" className="insLU" type="email" onChange={(e) => { setEmail1(e.target.value) }} />
                    </div>
                    <div className="divf divInsL gapSM">
                        <p className="f1-5">Password</p>
                        <input type="password" placeholder="password" className="insLU" onChange={(e) => { setPass1(e.target.value) }} />
                    </div>
                    <div className="divf mUpM wFull">
                        {/* <button className="f1-2">Forgot Password?</button> */}
                        <button id="idDoLog" className="doLog" onClick={() => { doLogin() }}>Login</button>
                    </div>

                </div>
            </div>

        </>
    )
}