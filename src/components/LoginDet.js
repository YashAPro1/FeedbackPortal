import Navbar from "./Navbar";
import "../css/login.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { notifyS } from "../funcs/func1";
import Cookies from 'universal-cookie';
import { useState } from "react";

export default function Login() {

    const navigate = useNavigate();
    const cookies = new Cookies();

    const timer = ms => new Promise(res => setTimeout(res, ms));

    const [studentD, setStudentD] = useState({
        "Year": "FY",
        "Semester": 1,
        "Branch": "Computer",
        "Division": "A"
    });


    const doLoginDet = async () => {

        cookies.set("user2", "yo", { maxAge: 1800 });
        notifyS({ msg: "Successful" });
        await timer(200);
        navigate("/");
    }

    const handleChange = (inS, vals) => {
        var stD = studentD;
        stD[inS] = vals;
        setStudentD({ ...stD });
    }

    return (
        <>
            <Navbar />
            <div className="divf fullbg fullWH">
                <ToastContainer />
                <div className="dashbgI"></div>
                <div className="divf loginC fdirc">
                    <p className="f2 headT">Please Enter your details</p>
                    <div className="divf divInsL gapSM mUpM">
                        <p className="f1-5">Year</p>
                        <select placeholder="Year" className="insLU" value={studentD.Year} onChange={(e) => { handleChange("Year", e.target.value) }}>
                            <option value="FY">FY</option>
                            <option value="SY">SY</option>
                            <option value="TY">TY</option>
                            <option value="LY">LY</option>
                        </select>
                    </div>
                    <div className="divf divInsL gapSM mUpM">
                        <p className="f1-5">Semester</p>
                        <select placeholder="Year" className="insLU" value={studentD.Semester} onChange={(e) => { handleChange("Semester", e.target.value) }}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <div className="divf divInsL gapSM mUpM">
                        <p className="f1-5">Branch</p>
                        <select placeholder="Year" className="insLU">
                            <option>Computer</option>
                            <option>IT</option>
                            <option>AIDS</option>
                            <option>EXTC</option>
                        </select>
                    </div>
                    <div className="divf divInsL gapSM mUpM">
                        <p className="f1-5">Division</p>
                        <select placeholder="Year" className="insLU">
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                        </select>
                    </div>
                    <button className="doLog mUpM" onClick={() => { doLoginDet() }}>Next</button>
                </div>
            </div>
        </>
    )
}