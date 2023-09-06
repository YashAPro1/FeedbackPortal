import Navbar from "./Navbar";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate();

    return(
    <>
        <Navbar />
        <div className="divf fullbg fullWH">
            <div className="divf loginC fdirc">
                <p className="f2 headT">Login</p>
                <div className="divf divInsL gapSM mUpM">
                    <p className="f1-5">Username</p>
                    <input placeholder="username" className="insLU"/>
                </div>
                <div className="divf divInsL gapSM">
                    <p className="f1-5">Password</p>
                    <input placeholder="password" className="insLU"/>
                </div>
                <div className="divf jusSB mUpM wFull">
                    <button className="f1-2">Forgot Password?</button>
                    <button className="doLog" onClick={()=>{navigate("/login/details")}}>Login</button>
                </div>
                
            </div>
        </div>
    </>
    )
}