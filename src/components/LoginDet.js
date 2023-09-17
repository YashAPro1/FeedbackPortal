import Navbar from "./Navbar";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export default function Login() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="divf fullbg fullWH">
                <div className="dashbgI"></div>
                <div className="divf loginC fdirc">
                    <p className="f2 headT">Please Enter your details</p>
                    <div className="divf divInsL gapSM mUpM">
                        <p className="f1-5">Year</p>
                        <select placeholder="Year" className="insLU">
                            <option>FY</option>
                            <option>SY</option>
                            <option>TY</option>
                            <option>LY</option>
                        </select>
                    </div>
                    <div className="divf divInsL gapSM mUpM">
                        <p className="f1-5">Semester</p>
                        <select placeholder="Year" className="insLU">
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
                    <button className="doLog mUpM" onClick={() => { navigate("/") }}>Next</button>
                </div>
            </div>
        </>
    )
}