import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LineC from "../../components/charts/LineC";
import DTable from "../../components/tables/Dtable";
import "../../css/dash.css";

export default function ADash() {
    return (
        <>
            <Navbar />
            <div className="divf fdirc fullbg dashMain">
                <div className="dashbgI"></div>
                <p className="uTypeN">Admin Dashboard</p>
                <section className="sect1">
                    <div className="divf wFull chartP">
                        <div className="chartCards posR">
                            <p className="chartDesc">No. of Students filled Feedback</p>
                            <LineC className="chartsFig" />
                        </div>
                        <div className="chartCards posR">
                            <p className="chartDesc">No. of Students filled Feedback</p>
                            <LineC className="chartsFig" />
                        </div>
                    </div>
                </section>

                <section className="sect2">
                    <p className="dashTT1">Faculty Feedback Data</p>
                    {/* <DTable /> */}
                </section>
                <section>
                    <div className="divf comBox">
                        <Link to="/admin/departments">Go to Departments</Link>
                        <Link to="/admin/subjects">Go to Subjects</Link>
                        <Link to="/admin/faculties">Go to Faculties</Link>
                    </div>
                </section>
            </div>

        </>
    )
}