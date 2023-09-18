import { Link } from "react-router-dom";
import "../css/navbar.css";
import somLogo from "../img/somaiyaLogo.jpg";
import somTrust from "../img/somaiyaTrust.png";

export default function Navbar() {
    return (
        <>
            <div className="divf navbar">
                <div className="divf fGapS ">
                    <img src={somLogo} className="somLogo" />
                    <div className="kjsit">
                        <p className="kjhead">K. J. Somaiya Institute of Technology, Sion</p>
                        <p>An Autonomous Institute Permanently Affiliated to the University of Mumbai</p>
                    </div>
                </div>
                <div className=" fg1 ">
                    <Link className="fpHead" to="/" >Faculty Feedback Portal</Link>
                </div>
                <img src={somTrust} className="somTrust" />
            </div>
        </>
    )
}